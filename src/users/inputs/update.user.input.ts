import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create.user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput){
  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  directory: string;
}
