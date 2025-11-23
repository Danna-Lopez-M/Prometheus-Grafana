"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const equipments_module_1 = require("./equipments/equipments.module");
const roles_module_1 = require("./roles/roles.module");
const labs_module_1 = require("./labs/labs.module");
const deliveries_module_1 = require("./deliveries/deliveries.module");
const rentals_module_1 = require("./rentals/rentals.module");
const contract_module_1 = require("./contract/contract.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const prometheus_module_1 = require("./prometheus/prometheus.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prometheus_module_1.PrometheusModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    const isTest = process.env.NODE_ENV === 'test';
                    return {
                        type: 'postgres',
                        host: configService.get('DB_HOST'),
                        port: configService.get('DB_PORT'),
                        username: configService.get('DB_USERNAME'),
                        password: configService.get('DB_PASSWORD'),
                        database: configService.get('DB_NAME'),
                        autoLoadEntities: true,
                        synchronize: true,
                        logging: true,
                        ssl: false,
                    };
                },
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            equipments_module_1.EquipmentsModule,
            roles_module_1.RolesModule,
            users_module_1.UsersModule,
            rentals_module_1.RentalsModule,
            deliveries_module_1.DeliveriesModule,
            labs_module_1.LabsModule,
            contract_module_1.ContractModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map