import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.REDIS_SOCKET_PORT);
  await app.listen(8080);
};
bootstrap();
