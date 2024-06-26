import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
  }

  //crear usuario
  async createUser(user: User): Promise<User> {
      user.password = await hash(user.password, 10);
      const createdUser = this.userRepository.create(user);
      return await this.userRepository.save(createdUser);
  }

  //eliminar usuario
  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  //modificar usuario
  async updateUser(id: string, user: User): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  //listar usuario
  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  //mostrar formacion del usuario
  async getUser(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async checkUser(
    username: string,
    pass: string,
  ): Promise<string> {
    const user = await this.findByUsername(username);
    if (!(await compare(pass, user.password))) {
      throw new HttpException('Invalid credentials', 401);
    }
    const payload = { id: user.id, username: user.username };
    return await this.jwtService.signAsync(payload);
  }

  private async findByUsername(username: string) {
      return this.userRepository.findOne({ where: { username }});
  }
}
