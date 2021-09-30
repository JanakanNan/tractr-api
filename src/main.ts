import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('tractr');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Tractr API')
    .setDescription('Tractr API description')
    .setVersion('1.0')
    .addTag('Tractr')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  await app.listen(5000);
}
bootstrap();
