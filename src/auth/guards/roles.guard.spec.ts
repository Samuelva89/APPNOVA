import { Test, TestingModule } from '@nestjs/testing';
import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { UserRole } from 'src/common/constants/roles.enum';

// Describimos el conjunto de pruebas para RolesGuard
describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  // Esto se ejecuta antes de cada prueba ('it')
  beforeEach(async () => {
    // Creamos un módulo de prueba
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard, // El guardia que queremos probar
        {
          provide: Reflector, // Cuando alguien pida el Reflector...
          useValue: {
            // ...dale este objeto simulado (mock)
            getAllAndOverride: jest.fn(), // Simulamos su método principal con Jest
          },
        },
      ],
    }).compile();

    // Obtenemos instancias de nuestro guardia y el reflector simulado
    guard = module.get<RolesGuard>(RolesGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  // Una prueba básica para asegurar que todo se creó correctamente
  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('debería permitir el acceso si el usuario tiene el rol requerido', () => {
    // 1. Configuración de la simulación
    // Simulamos que el decorador @Roles devolvió ['LIDER_DE_PROYECTO']
    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue([UserRole.LIDER_DE_PROYECTO]);

    // Simulamos el objeto 'context' que recibe el guardia
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: {
            // Simulamos el usuario que Passport adjuntó a la petición
            roles: [UserRole.LIDER_DE_PROYECTO],
          },
        }),
      }),
      getHandler: () => {},
      getClass: () => {},
    } as unknown as ExecutionContext;

    // 2. Ejecución y Afirmación
    // Ejecutamos el método canActivate con nuestro contexto simulado
    const resultado = guard.canActivate(mockContext);

    // Afirmamos que el resultado es 'true' (acceso permitido)
    expect(resultado).toBe(true);
  });

  it('debería denegar el acceso si el usuario no tiene el rol requerido', () => {
    // 1. Configuración
    // La ruta sigue requiriendo ser LÍDER
    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue([UserRole.LIDER_DE_PROYECTO]);

    // Creamos un contexto donde el usuario es solo INVESTIGADOR
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: {
            roles: [UserRole.INVESTIGADOR], // <-- La diferencia clave está aquí
          },
        }),
      }),
      getHandler: () => {},
      getClass: () => {},
    } as unknown as ExecutionContext;

    // 2. Ejecución y Afirmación
    const resultado = guard.canActivate(mockContext);

    // Afirmamos que el resultado es 'false' (acceso denegado)
    expect(resultado).toBe(false);
  });

  it('debería permitir el acceso a un LIDER_DE_PROYECTO incluso si no tiene el rol requerido por la ruta', () => {
    // 1. Configuración
    // La ruta requiere un rol específico que el líder no tiene explícitamente.
    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue([UserRole.COINVENTIGADOR]);

    // Creamos un contexto donde el usuario es LIDER_DE_PROYECTO.
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: {
            roles: [UserRole.LIDER_DE_PROYECTO], // <-- El usuario es LÍDER
          },
        }),
      }),
      getHandler: () => {},
      getClass: () => {},
    } as unknown as ExecutionContext;

    // 2. Ejecución y Afirmación
    const resultado = guard.canActivate(mockContext);

    // Afirmamos que el resultado es 'true' porque el LÍDER tiene acceso a todo.
    expect(resultado).toBe(true);
  });

  it('debería denegar el acceso si la ruta no especifica roles y el usuario no es LÍDER', () => {
    // 1. Configuración
    // El reflector no devuelve roles para la ruta.
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

    // Creamos un contexto con un usuario regular.
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: {
            roles: [UserRole.INVESTIGADOR],
          },
        }),
      }),
      getHandler: () => {},
      getClass: () => {},
    } as unknown as ExecutionContext;

    // 2. Ejecución y Afirmación
    const resultado = guard.canActivate(mockContext);

    // Afirmamos que el resultado es 'false' debido a la política de "denegar por defecto".
    expect(resultado).toBe(false);
  });
});
