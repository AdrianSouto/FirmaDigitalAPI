/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'document', database: 'firma' })
@ObjectType()
export class DocumentEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  @ApiProperty({ example: '4de373fc-61cd-456e-a1ca-701443e6f204', description: 'ID del documento' })
  id: string;

  @Column()
  @Field()
  @ApiProperty({ example: 'Factura', description: 'Nombre del documento' })
  name: string;

  @Column()
  @Field()
  @ApiProperty({ example: '2bd9688ae309ac7a8f3c3187d14e81f1', description: 'Nombre que con el que se guarda en el servidor automaticamente' })
  servername: string;

  @Column()
  @Field()
  @ApiProperty({ example: 'pdf', description: 'Extensión del documento', nullable: true})
  type: string;
}