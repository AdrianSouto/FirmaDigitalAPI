// users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity' ;
import { UsersResolver } from './users.resolver';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/jwtConstants';
import { JwtStrategy } from './jwt/jwt.strategy';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '8760h' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver, JwtStrategy],
})
export class UsersModule {
}