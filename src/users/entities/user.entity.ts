/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user', database: 'firma' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  @ApiProperty({ example: '001101', description: 'id user' })
  id: string;

  @Column()
  @Field()
  @ApiProperty({ example: 'Carlos Garcia', description: 'name' })
  name: string;

  @Column()
  @Field()
  @ApiProperty({ example: 'GarciaCarl', description: 'User name' })
  username: string;

  @ApiProperty({ example: 12345, description: 'password' })
  @Column()
  @Field()
  password: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  @ApiProperty({ example: 'https://www.ejemplo.com/', description: 'directory' })
  directory: string;
}