import mongoose, { Document, Schema } from 'mongoose';
import { UserRole } from 'src/common/constants/roles.enum';


export interface IUser extends Document {
  nombreCompleto: string;
  email: string;
  contrasena: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = new mongoose.Schema(
  {
    nombreCompleto: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contrasena: { type: String, required: true }, // Notar que el campo ahora se llama 'contrasena'
    roles: { type: [String], required:true, enum: UserRole,default: [UserRole.INVESTIGADOR ]}, // Array de roles y comunicacion con la base de datos y roles
  },
  {
    timestamps: true,
  },
);