import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: 'http://localhost:3000' });
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(cookieParser());
  await app.listen(8080);
};
bootstrap();
