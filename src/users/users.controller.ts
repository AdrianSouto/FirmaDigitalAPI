import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Delete } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {
  }

  @Post()
  @ApiOperation({ summary: 'crear usuario' })
  @ApiResponse({ status: 201, description: 'successful answer', type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() user: User): Promise<User> {
    return await this.userService.createUser(user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'eliminar usuario' })
  @ApiParam({ name: 'id', description: 'Usuario ID' })
  @ApiResponse({ status: 204, description: 'successful answer', type: User })
  @ApiResponse({ status: 404, description: 'User Not Found' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUser(id);
  }
  @Patch(':id')
  @ApiOperation({ summary: 'actualizar informacion del usuario' })
  @ApiParam({ name: 'id', description: 'Usuario ID' })
  @ApiResponse({ status: 200, description: 'successful answer', type: User })
  @ApiResponse({ status: 404, description: 'Invalid credentials' })
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.userService.updateUser(id, user);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'listar usuario' })
  @ApiResponse({ status: 200, description: 'successful answer', type: User })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'mostrar formacion del usuario' })
  @ApiParam({ name: 'id', description: 'Usuario ID' })
  @ApiResponse({ status: 200, description: 'successful answer', type: User })
  @ApiResponse({ status: 404,description:'User not found' })

  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }
  @Get(':username/:password')
  @ApiOperation({ summary: 'obtener token para usuario' })
  @ApiParam({ name: 'username/:password', description: 'password user' })
  @ApiResponse({ status: 200, description: 'successful answer', type: User })
  @ApiResponse({ status: 401 , description: 'Unauthorized' })
  async getToken(@Param('username') userName,
               @Param('password') password): Promise<string> {
    return this.userService.checkUser(userName, password);
  }
}