import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { ValidationGuard } from './validation/validation.guard';

@UseGuards(ValidationGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.appService.getAllUsers();
  }
  @Get('/user')
  getUser(): Promise<boolean> {
    return this.appService.checkUser('adrian', '123456');
  }
}
