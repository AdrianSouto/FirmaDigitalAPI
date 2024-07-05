/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user', database: 'firma' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  @ApiProperty({ example: '4de373fc-61cd-456e-a1ca-701443e6f204', description: 'id user' })
  id: string;

  @Column()
  @Field()
  @ApiProperty({ example: 'Carlos Garcia', description: 'Nombre de la persona' })
  name: string;

  @Column()
  @Field()
  @ApiProperty({ example: 'garciacarl', description: 'Nombre de usuario' })
  username: string;

  @ApiProperty({ example: '12345', description: 'Contraseña' })
  @Column()
  @Field()
  password: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  @ApiProperty({ example: 'garciacarl', description: 'directory', nullable: true})
  directory: string;
}