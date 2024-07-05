import { Field, InputType } from '@nestjs/graphql';
import { UserEntity } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends UserEntity{
  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  directory: string;
}