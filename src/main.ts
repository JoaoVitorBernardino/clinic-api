import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function bootstrap() {
    const logger = new Logger('main.ts')
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
        .setTitle('Clinic API')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document, {
        swaggerOptions: {
            tagsSorter: 'alpha',
        }
    });

    const PORT = process.env.PORT;

    await app.listen(Number(PORT)).then(() => logger.log(`App running on port ${PORT}`));
}
bootstrap();
