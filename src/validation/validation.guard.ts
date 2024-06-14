/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Injectable()
export class ValidationGuard implements CanActivate {
  constructor(private readonly appService: AppService) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    console.log(request.headers);
    const userName = request.headers['user-name'];
    const userPass = request.headers['user-pass'];
    return this.appService.checkUser(userName, userPass);

  }
}
