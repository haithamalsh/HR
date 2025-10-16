import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 4002);
  console.log('inventory-service listening on', process.env.PORT || 4002);
}
bootstrap();
