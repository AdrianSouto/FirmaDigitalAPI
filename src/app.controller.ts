/* eslint-disable prettier/prettier */
import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors , Get} from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './users/jwt/jwt-auth.guard';
@ApiTags('documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Post()
  @ApiOperation({ summary: 'Subir documentos' })
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.appService.uploadFiles(files);
  }
  @Get()
  @ApiOperation({ summary: 'Obtener archivos' })
  getFiles() {
    return this.appService.getFiles();
  }
}
