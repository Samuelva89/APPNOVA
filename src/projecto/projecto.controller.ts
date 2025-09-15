import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ProjectoService } from './projecto.service';
import { ProjectoDto } from './dto/projecto.dto';
import { IProjecto } from './dto/projecto.model';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/common/constants/roles.enum';

@Controller('projecto')
@UseGuards(AuthGuard('jwt'), RolesGuard) // Aplicamos los guards a todo el controlador
export class ProjectoController {
  constructor(private readonly ProjectoService: ProjectoService) {}

  @Post()
  @Roles(UserRole.LIDER_DE_PROYECTO) // Solo el líder puede crear
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() crearProjectoDto: ProjectoDto): Promise<IProjecto> {
    return await this.ProjectoService.crear(crearProjectoDto);
  }

  @Get()
  // Todos los roles autenticados pueden ver la lista de proyectos
  @Roles(
    UserRole.LIDER_DE_PROYECTO,
    UserRole.DINAMIZADOR,
    UserRole.COINVENTIGADOR,
    UserRole.INVESTIGADOR,
  )
  async consultarTodos(): Promise<IProjecto[]> {
    return await this.ProjectoService.consultarTodos();
  }

  @Get(':id')
  // Todos los roles autenticados pueden ver un proyecto específico
  @Roles(
    UserRole.LIDER_DE_PROYECTO,
    UserRole.DINAMIZADOR,
    UserRole.COINVENTIGADOR,
    UserRole.INVESTIGADOR,
  )
  async consultarPorId(@Param('id') id: string): Promise<IProjecto> {
    return await this.ProjectoService.consultarPorId(id);
  }

  @Put(':id')
  @Roles(UserRole.LIDER_DE_PROYECTO) // Solo el líder puede reemplazar todo el proyecto
  async actualizarCompleto(
    @Param('id') id: string,
    @Body() actualizarProjectoDto: ProjectoDto,
  ): Promise<IProjecto> {
    return await this.ProjectoService.actualizar(id, actualizarProjectoDto);
  }

  @Patch(':id')
  // El líder, coinvestigador e investigador pueden "aportar información"
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.COINVENTIGADOR, UserRole.INVESTIGADOR)
  async actualizarParcial(
    @Param('id') id: string,
    @Body() actualizarProjectoDto: Partial<ProjectoDto>,
  ): Promise<IProjecto> {
    return await this.ProjectoService.actualizar(id, actualizarProjectoDto);
  }

  @Delete(':id')
  @Roles(UserRole.LIDER_DE_PROYECTO) // Solo el líder puede eliminar
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id') id: string) {
    await this.ProjectoService.eliminar(id);
  }
}