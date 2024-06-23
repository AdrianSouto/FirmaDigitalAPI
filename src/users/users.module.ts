// users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity' ;
import { UsersResolver } from './users.resolver';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/jwtConstants';
import { JwtStrategy } from './jwt/jwt.strategy';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '365d' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver, JwtStrategy],
})
export class UsersModule {
}