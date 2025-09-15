import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsArray, IsEnum } from 'class-validator';
import { UserRole } from '../../common/constants/roles.enum';

export class LoginAuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    contraseña: string;
}

export class RegisterAuthDto {
    @IsString()
    @IsNotEmpty()
    NombreCompleto: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    contraseña: string;

    @IsArray()
    @IsEnum(UserRole, { each: true })
    @IsOptional()
    roles?: UserRole[];
}