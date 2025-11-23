"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const express_1 = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bodyParser: false });
    const cors = require('cors');
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '50mb' }));
    app.use(cors());
    app.use((req, res, next) => {
        if (req.headers['content-type']?.includes('text/plain') && req.method === 'POST') {
            req.headers['content-type'] = 'application/json';
        }
        next();
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        disableErrorMessages: false,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API de Equipos')
        .setDescription('API para gestionar equipos de computación, impresoras y teléfonos.')
        .setVersion('1.0')
        .addTag('equipos')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
//# sourceMappingURL=main.js.map