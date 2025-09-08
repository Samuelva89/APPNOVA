import mongoose, { Document, Schema } from 'mongoose';

// Interfaz que representa un documento de Projecto en MongoDB
export interface Iprojecto extends Document {
  titulo: string;
  resumen: string;
  planteamientodelProblema: string;
  objetivos: string;
  justificacion: string;
  metodologia: string;
  resultadosEsperados: string;
  estado: string;
  fechadeInicio: Date;
  fechadeFin: Date;
}

// Esquema de Mongoose para la colección 'Projecto'
export const ProjectoSchema: Schema = new mongoose.Schema(
  {
    titulo: { 
      type: String, 
      required: true, 
      unique: true // 👈 Evita que se repitan los títulos
    },
    aprendiz:{type: Schema.Types.ObjectId, ref: 'Aprendiz'},//Referencia al modelo Aprendiz
    instructores:{type: Schema.Types.ObjectId, ref: 'Instructores'},//Referencia al modelo Instructor
    cronograma:{type: Schema.Types.ObjectId, ref: 'Cronograma'},//Referencia al modelo Cronograma
    evidencias:{type: Schema.Types.ObjectId, ref: 'Evidencias'},//Referencia al modelo Evidencias
    seguimiento:{type: Schema.Types.ObjectId, ref: 'Seguimiento'},//Referencia al modelo Seguimiento


    resumen: { type: String, required: true },
    planteamientodelProblema: { type: String, required: true },
    objetivos: { type: String, required: true },
    justificacion: { type: String, required: true },
    metodologia: { type: String, required: true },
    resultadosEsperados: { type: String, required: true },

    estado: { 
      type: String, 
      required: true, 
      enum: ['en desarrollo', 'finalizado', 'pendiente'] // 👈 Asegura valores válidos
    },

    fechadeInicio: { type: Date, required: true },
    fechadeFin: { type: Date, required: true },

  },
  
  {
    timestamps: true,
  },

);