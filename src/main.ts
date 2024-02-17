import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors(CORS);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,//TODO transforma la data
      transformOptions: {
        enableImplicitConversion: true,//TODO opcion para la transforamcion
      },
    }),
  )
  await app.listen(process.env.PORT);
  console.log(`app is running on port ${process.env.PORT}`);
}
bootstrap();
