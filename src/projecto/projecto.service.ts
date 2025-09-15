import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProjecto } from './dto/projecto.model';
import { ProjectoDto } from './dto/projecto.dto';

@Injectable()
export class ProjectoService {
  constructor(
    @InjectModel('Projecto') private readonly ProjectoModel: Model<IProjecto>,
  ) {}

  async crear(crearProjectoDto: ProjectoDto): Promise<IProjecto> {
    const { tituloDeProyecto } = crearProjectoDto;

    const projectoExistente = await this.ProjectoModel.findOne({
      tituloDeProyecto,
    }).exec();

    if (projectoExistente) {
      throw new ConflictException(
        `Ya existe un proyecto con el título "${tituloDeProyecto}".`,
      );
    }

    const nuevoProjecto = new this.ProjectoModel(crearProjectoDto);
    return await nuevoProjecto.save();
  }

  async consultarTodos(): Promise<IProjecto[]> {
    return await this.ProjectoModel.find().exec();
  }

  async consultarPorId(id: string): Promise<IProjecto> {
    const projecto = await this.ProjectoModel.findById(id)
      .populate([
        'aprendices',
        'instructores',
        'cronograma',
        'evidencias',
        'seguimiento',
        'semillero',
      ])
      .exec();
    if (!projecto) {
      throw new NotFoundException(`Proyecto con ID "${id}" no encontrado.`);
    }
    return projecto;
  }

  async actualizar(
    id: string,
    actualizarProjectoDto: Partial<ProjectoDto>,
  ): Promise<IProjecto> {
    const projectoActualizado = await this.ProjectoModel.findByIdAndUpdate(
      id,
      actualizarProjectoDto,
      {
        new: true,
        runValidators: true,
      },
    ).exec();

    if (!projectoActualizado) {
      throw new NotFoundException(`Proyecto con ID "${id}" no encontrado.`);
    }
    return projectoActualizado;
  }

  async eliminar(id: string): Promise<IProjecto> {
    const projectoEliminado =
      await this.ProjectoModel.findByIdAndDelete(id).exec();
    if (!projectoEliminado) {
      throw new NotFoundException(`Proyecto con ID "${id}" no encontrado.`);
    }
    return projectoEliminado;
  }
}
