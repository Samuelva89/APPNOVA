import mongoose, { Document, Schema } from 'mongoose';
import { IAprendiz } from 'src/aprendiz/dto/aprendiz.model';
import { ICronograma } from 'src/cronograma/dto/cronograma.model';
import { IEvidencia } from 'src/evidencias/dto/evidencias.model';
import { IInstructores } from 'src/instructores/dto/instructores.model';
import { ISeguimiento } from 'src/seguimiento/dto/seguimiento.model';
import { ISemillero } from 'src/semillero/dto/semillero.model';
import { ProjectoEstado } from './projecto.dto';

// Interfaz que representa un documento de Projecto en MongoDB
export interface IProjecto extends Document {
  fechaInicio: Date;
  fechaFin: Date;
  regional: string;
  municipio: string;
  centroDeFormacion: string;
  programaDeFormacion: string;
  nombreDelSemilleroDeInvestigacion: string;
  lineaDeInvestigacionAsociada: string;
  instructores: IInstructores[]; //Referencia al modelo Instructor
  tituloDeProyecto: string;
  resumen: string;
  palabrasClave: string;
  justificacion: string;
  planteamientoDelProblema: string;
  estadoDelArte: string;
  objetivoGeneral: string;
  objetivoEspecifico: string;
  beneficiarios: string;
  metodologia: string;
  impactosEconomicoSocialAmbientalEsperados: string;
  resultadosEsperados: string;
  estado: ProjectoEstado;
  bibliografia: string;
  anexos: string;
  aprendices: IAprendiz[];
  cronograma: ICronograma[];
  semillero: ISemillero[];
  seguimiento: ISeguimiento[];
  evidencias: IEvidencia[];
}

// Esquema de Mongoose para la colección 'Projecto'
export const ProjectoSchema: Schema = new mongoose.Schema(
  {
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
    regional: { type: String, required: true },
    municipio: { type: String, required: true },
    centroDeFormacion: { type: String, required: true },
    programaDeFormacion: { type: String, required: true },
    nombreDelSemilleroDeInvestigacion: { type: String, required: true },
    lineaDeInvestigacionAsociada: { type: String, required: true },
    tituloDeProyecto: { type: String, required: true, unique: true },
    resumen: { type: String, required: true },
    palabrasClave: { type: String, required: true },
    justificacion: { type: String, required: true },
    planteamientoDelProblema: { type: String, required: true },
    estadoDelArte: { type: String, required: false },
    objetivoGeneral: { type: String, required: true },
    objetivoEspecifico: { type: String, required: true },
    beneficiarios: { type: String, required: true },
    metodologia: { type: String, required: true },
    impactosEconomicoSocialAmbientalEsperados: {
      type: String,
      required: true,
    },
    resultadosEsperados: { type: String, required: true },
    estado: {
      type: String,
      required: true,
      enum: Object.values(ProjectoEstado),
    },
    bibliografia: { type: String, required: false },
    anexos: { type: String, required: false },
    aprendices: [{ type: Schema.Types.ObjectId, ref: 'Aprendiz' }],
    instructores: [{ type: Schema.Types.ObjectId, ref: 'Instructor' }],
    cronograma: [{ type: Schema.Types.ObjectId, ref: 'Cronograma' }],
    evidencias: [{ type: Schema.Types.ObjectId, ref: 'Evidencia' }],
    seguimiento: [{ type: Schema.Types.ObjectId, ref: 'Seguimiento' }],
    semillero: [{ type: Schema.Types.ObjectId, ref: 'Semillero' }],
  },
  {
    timestamps: true,
  },
);
