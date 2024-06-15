import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  //crear usuario
  async createUser(createUser: User): Promise<User> {
    try {
      const user = await this.userRepository.create(createUser);
      return await this.userRepository.save(user);
    } catch (err) {
      // Manejo de errores
    }
  }

  //eliminar usuario
  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  //modificar usuario
  async updateUser(id: number, user: User): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  //listar usuario
  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  //mostrar formacion del usuario
  async getUser(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async checkUser(userName: string, userPass: string): Promise<boolean> {
    if (userName && userPass)
      return await this.userRepository.findOneBy({
        username: userName,
        password: userPass,
      }) != null;
    else
      return false;
  }

}
