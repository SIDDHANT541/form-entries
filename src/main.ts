import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS - include all HTTP methods
  app.enableCors({
    // origin: true, // Allow all origins in production, or specify your frontend URL
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    // credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // Enable implicit type conversion
      },
    }),
  );

  const port = process.env.PORT ?? 3000;

  // Listen on 0.0.0.0 for Railway compatibility
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on port: ${port}`);
}

bootstrap();
