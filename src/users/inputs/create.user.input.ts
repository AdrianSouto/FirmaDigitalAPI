import { Field, InputType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends User{
  @Field()
  name: string;

  @Field()
  username: string;

  token: string;
}