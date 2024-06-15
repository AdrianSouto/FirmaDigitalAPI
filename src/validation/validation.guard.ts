/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class ValidationGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    console.log(request.headers);
    const userName = request.headers['user-name'];
    const userPass = request.headers['user-pass'];
    return this.usersService.checkUser(userName, userPass);

  }
}
