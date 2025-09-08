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
import { projectoDto } from './dto/projecto.dto';
import { Iprojecto } from './dto/projecto.model';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/common/constants/roles.enum';

@Controller('projecto')
export class ProjectoController {
  constructor(private readonly ProjectoService: ProjectoService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() crearProjectoDto: projectoDto): Promise<Iprojecto> {
    return await this.ProjectoService.crear(crearProjectoDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.DINAMIZADOR)
  async consultarTodos(): Promise<Iprojecto[]> {
    return await this.ProjectoService.consultarTodos();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.DINAMIZADOR)
  async consultarPorId(@Param('id') id: string): Promise<Iprojecto> {
    return await this.ProjectoService.consultarPorId(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async actualizarCompleto(
    @Param('id') id: string,
    @Body() actualizarProjectoDto: projectoDto,
  ): Promise<Iprojecto> {
    return await this.ProjectoService.actualizar(id, actualizarProjectoDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async actualizarParcial(
    @Param('id') id: string,
    @Body() actualizarProjectoDto: Partial<projectoDto>,
  ): Promise<Iprojecto> {
    return await this.ProjectoService.actualizar(id, actualizarProjectoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id') id: string) {
    await this.ProjectoService.eliminar(id);
  }
}