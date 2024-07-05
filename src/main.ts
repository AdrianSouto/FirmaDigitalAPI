import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.getHttpAdapter().getInstance().disable('x-powered-by');
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Documentación API Firma Digital')
    .setVersion('1.0')
    .addBearerAuth()
    .build();


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}

bootstrap();


