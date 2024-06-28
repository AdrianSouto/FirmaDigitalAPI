import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Swagger')
@Controller('swagger')
export class SwaggerController {
  @Get()
  getSwaggerUI() {
    return 'Swagger UI';
  }
}
