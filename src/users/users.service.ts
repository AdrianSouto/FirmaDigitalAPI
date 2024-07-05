import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {
  }

  //crear usuario
  async createUser(user: UserEntity): Promise<UserEntity> {
      user.password = await hash(user.password, 10);
      const createdUser = this.userRepository.create(user);
      return await this.userRepository.save(createdUser);
  }

  //eliminar usuario
  async deleteUser(id: string): Promise<void> {
    this.getUser(id);
    await this.userRepository.delete(id);
  }

  //modificar usuario
  async updateUser(id: string, newUser: UserEntity): Promise<UserEntity> {
    const user = this.getUser(id);
    await this.userRepository.update(id, newUser);
    return user;
  }

  //listar usuario
  async getUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  //mostrar formacion del usuario
  async getUser(id: string): Promise<UserEntity> {
    const user = this.userRepository.findOne({ where: { id } });
    if (!user)
      throw new HttpException('User not found', 404);
    return user;
  }

  async getToken(
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
