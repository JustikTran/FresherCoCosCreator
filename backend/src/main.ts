import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const PORT = process.env.PORT ?? 8080;
  await app.listen(PORT);
  console.log(`Server listen on http://localhost:${PORT}`);

}
bootstrap();
