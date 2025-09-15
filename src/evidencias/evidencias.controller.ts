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

@Controller('evidencias')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class EvidenciasController {
  constructor(private readonly evidenciaService: EvidenciasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() crearEvidenciaDto: EvidenciaDto): Promise<IEvidencia> {
    return await this.evidenciaService.crear(crearEvidenciaDto);
  }

  @Get()
  async consultarTodos(): Promise<IEvidencia[]> {
    return await this.evidenciaService.consultarTodos();
  }

  @Get(':id')
  async consultarporID(@Param('id') id: string): Promise<IEvidencia> {
    return await this.evidenciaService.consultarPorId(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarEvidenciasDto: EvidenciaDto,
  ): Promise<IEvidencia> {
    return await this.evidenciaService.actualizar(id, actualizarEvidenciasDto);
  }

  @Patch(':id')
  async actualizarParcial(
    @Param('id') id: string,
    @Body() actualizarEvidenciasDto: Partial<EvidenciaDto>,
  ): Promise<IEvidencia> {
    return await this.evidenciaService.actualizar(id, actualizarEvidenciasDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id') id: string) {
    await this.evidenciaService.eliminar(id);
  }
}