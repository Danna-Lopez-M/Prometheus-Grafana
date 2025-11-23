"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const contract_module_1 = require("../contract/contract.module");
const contract_entity_1 = require("../contract/entities/contract.entity");
const equipments_module_1 = require("../equipments/equipments.module");
const users_module_1 = require("../users/users.module");
const rental_entity_1 = require("./entities/rental.entity");
const rentals_controller_1 = require("./rentals.controller");
const rentals_service_1 = require("./rentals.service");
let RentalsModule = class RentalsModule {
};
exports.RentalsModule = RentalsModule;
exports.RentalsModule = RentalsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                rental_entity_1.RentalContract,
                contract_entity_1.Contract,
            ]),
            equipments_module_1.EquipmentsModule,
            contract_module_1.ContractModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
        ],
        controllers: [rentals_controller_1.RentalsController],
        providers: [rentals_service_1.RentalsService],
        exports: [typeorm_1.TypeOrmModule],
    })
], RentalsModule);
//# sourceMappingURL=rentals.module.js.map