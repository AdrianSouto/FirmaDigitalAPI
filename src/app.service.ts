/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
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
