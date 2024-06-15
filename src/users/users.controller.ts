import { Controller, Post, Body , Get} from '@nestjs/common';
import {  UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { Delete } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Patch } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService ) {}

  @Post()
  async signUp(@Body() user: User): Promise<User> {
    return await this.userService.createUser(user);
  }
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.userService.deleteUser(id);
  }
  @Patch(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<User> {
    return this.userService.updateUser(id, user);
}
@Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    return this.userService.getUser(id);
  }
  @Get('/user')
  checkUser(): Promise<boolean> {
    return this.userService.checkUser('adrian', '123456');
  }
}