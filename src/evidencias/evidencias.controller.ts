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
import { EvidenciasService } from './evidencias.service';
import { IEvidencia } from './dto/evidencias.model';
import { EvidenciaDto } from './dto/evidencias.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/common/constants/roles.enum';

@Controller('evidencias')
export class EvidenciasController {
  constructor(private readonly evidenciaService: EvidenciasService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() crearEvidenciaDto: EvidenciaDto): Promise<IEvidencia> {
    return await this.evidenciaService.crear(crearEvidenciaDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.DINAMIZADOR)
  async consultarTodos(): Promise<IEvidencia[]> {
    return await this.evidenciaService.consultarTodos();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.DINAMIZADOR)
  async consultarporID(@Param('id') id: string): Promise<IEvidencia> {
    return await this.evidenciaService.consultarPorId(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarEvidenciasDto: EvidenciaDto,
  ): Promise<IEvidencia> {
    return await this.evidenciaService.actualizar(id, actualizarEvidenciasDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async actualizarParcial(
    @Param('id') id: string,
    @Body() actualizarEvidenciasDto: Partial<EvidenciaDto>,
  ): Promise<IEvidencia> {
    return await this.evidenciaService.actualizar(id, actualizarEvidenciasDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id') id: string) {
    await this.evidenciaService.eliminar(id);
  }
}