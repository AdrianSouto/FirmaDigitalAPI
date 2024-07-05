/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentEntity } from './entities/document.entity';


@Injectable()
export class AppService {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly docRepository: Repository<DocumentEntity>) {
  }

  async uploadFiles(files: Array<Express.Multer.File>) {
    var fileNames = Array<string>();
    files.forEach((file) => {
      const doc = new DocumentEntity();
      doc.name = file.originalname;
      doc.servername = file.filename;
      doc.type = file.mimetype;
      const createdDoc = this.docRepository.create(doc);
      this.docRepository.save(createdDoc);
      fileNames.push(file.originalname);
    });
    return fileNames;
  }
}
