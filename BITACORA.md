---

### **Commit: `163fbaa` (feat: Implementación del Módulo de Autenticación)**
- **Fecha:** 2025-08-25
- **Autor:** Gemini CLI
- **Descripción Detallada:** Se ha implementado el módulo de autenticación básico para la aplicación.
    - **Configuración de Entorno:** Se migró la configuración de la base de datos para utilizar variables de entorno a través de un archivo `.env` y el módulo `@nestjs/config`. Se eliminó el archivo `database.config.ts` obsoleto.
    - **Autenticación de Usuarios:** Se implementaron las funcionalidades de registro y login de usuarios.
    - **Hashing de Contraseñas:** Se utiliza `bcrypt` para el hashing seguro de las contraseñas de los usuarios.
    - **Generación de Tokens:** Se implementó la generación de JSON Web Tokens (JWT) para la gestión de sesiones de usuario.
    - **Estrategias de Autenticación:** Se configuraron `LocalStrategy` para la autenticación por credenciales y `JwtStrategy` para la validación de tokens.
    - **Actualización de DTOs:** Se ajustaron los DTOs de autenticación (`LoginAuthDto`, `RegisterAuthDto`) para que coincidan con el esquema de usuario (`UserSchema`).
    - **Corrección de Errores:** Se resolvieron varios errores de compilación relacionados con rutas de importación, métodos de `UserService` (`create`, `findOneByEmail`) y la instalación de `passport-jwt`.