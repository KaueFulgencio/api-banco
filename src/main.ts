import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT'],
  });
  
  await app.listen(3001);
}
bootstrap();
