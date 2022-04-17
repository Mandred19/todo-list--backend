import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const { HOST = '0.0.0.0', PORT = 3000 } = process.env;

  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, HOST);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
