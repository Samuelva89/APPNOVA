import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { IUser } from './dto/user.model';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

    @Post()
  async create(@Body() createUserDto: UserDto): Promise<IUser> {
    return await this.UserService.create(createUserDto);
  }

  @Get()
  async consultarTodos(): Promise<IUser[]> {
    return await this.UserService.consultaTodos();
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarUserDTO: Partial<UserDto>,
  ): Promise<IUser | null> {
    return await this.UserService.actualizar(id, actualizarUserDTO);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string): Promise<IUser | null> {
    return await this.UserService.eliminar(id);
  }
}
