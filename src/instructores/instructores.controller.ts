import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InstructoresService } from './instructores.service';
import { instructoresDto } from './dto/instructores.dto';
import { IInstructores } from './dto/instructores.model';

@Controller('instructores')
export class InstructoresController {
  constructor(private readonly instructoresService: InstructoresService) {}

  @Post()
  async crear(
    @Body() crearInstructoresDto: instructoresDto,
  ): Promise<IInstructores> {
    return await this.instructoresService.crear(crearInstructoresDto);
  }

  @Get()
  async consultarTodos(): Promise<IInstructores[]> {
    return await this.instructoresService.consultarTodos();
  }

  @Get(':id')
  async consultarPorId(@Param('id') id: string): Promise<IInstructores | null> {
    return await this.instructoresService.consultarPorId(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarInstructoresDto: Partial<instructoresDto>,
  ): Promise<IInstructores | null> {
    return await this.instructoresService.actualizar(
      id,
      actualizarInstructoresDto,
    );
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string): Promise<IInstructores | null> {
    return await this.instructoresService.eliminar(id);
  }
}
