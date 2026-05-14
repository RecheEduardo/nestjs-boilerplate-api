import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, enviroment: string) {
  if (enviroment !== 'development') return;

  const apiDocument = new DocumentBuilder()
    .setTitle('NestJS Boilerplate API')
    .setDescription('The NestJS Boilerplate API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, apiDocument);

  SwaggerModule.setup('api', app, document);
}
