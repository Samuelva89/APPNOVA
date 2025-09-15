import mongoose, { Document, Schema } from 'mongoose';


export interface ISeguimiento extends Document {
  observacion: string;
  fecha_observacion: Date;
}

export const SeguimientoSchema: Schema = new mongoose.Schema(
  {
    observacion: {
      type: String,
      required: true,
      trim: true,
    },
    fecha_observacion: {
      type: Date,
      required: false,
    },
    projecto:{type: Schema.Types.ObjectId, ref: 'Projecto'},//Referencia al modelo Projecto
    user:{type: Schema.Types.ObjectId, ref: 'User'},//Referencia al modelo User
  },
  {
    timestamps: true,
  },
);