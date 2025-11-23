"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabsModule = void 0;
const common_1 = require("@nestjs/common");
const labs_service_1 = require("./labs.service");
const labs_controller_1 = require("./labs.controller");
const typeorm_1 = require("@nestjs/typeorm");
const lab_entity_1 = require("./entities/lab.entity");
const rentals_module_1 = require("../rentals/rentals.module");
const equipment_entity_1 = require("../equipments/entities/equipment.entity");
const auth_module_1 = require("../auth/auth.module");
let LabsModule = class LabsModule {
};
exports.LabsModule = LabsModule;
exports.LabsModule = LabsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([lab_entity_1.Lab, equipment_entity_1.Equipment]),
            rentals_module_1.RentalsModule,
            auth_module_1.AuthModule
        ],
        controllers: [labs_controller_1.LabsController],
        providers: [labs_service_1.LabsService],
    })
], LabsModule);
//# sourceMappingURL=labs.module.js.map