import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { log } from 'util';

async function bootstrap() {
  const { HOST, PORT } = process.env;

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(PORT, HOST, async () => log(`Application is running on: ${await app.getUrl()}`));
}

bootstrap();
