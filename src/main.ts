import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('payments-ms main');
  const app = await NestFactory.create(AppModule,
    // aqui se configura los middlewares de nest
    {rawBody: true});
  
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))

  await app.listen(envs.port);
  logger.log(`payments microservice listening on port ${envs.port}`);
}
bootstrap();
