"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const equipments_service_1 = require("./equipments.service");
const equipments_controller_1 = require("./equipments.controller");
const equipment_entity_1 = require("./entities/equipment.entity");
const computer_specs_entity_1 = require("./entities/computer-specs.entity");
const printer_specs_entity_1 = require("./entities/printer-specs.entity");
const phone_specs_entity_1 = require("./entities/phone-specs.entity");
let EquipmentsModule = class EquipmentsModule {
};
exports.EquipmentsModule = EquipmentsModule;
exports.EquipmentsModule = EquipmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                equipment_entity_1.Equipment,
                computer_specs_entity_1.ComputerSpecs,
                printer_specs_entity_1.PrinterSpecs,
                phone_specs_entity_1.PhoneSpecs,
            ]),
        ],
        controllers: [equipments_controller_1.EquipmentsController],
        providers: [equipments_service_1.EquipmentsService],
        exports: [equipments_service_1.EquipmentsService],
    })
], EquipmentsModule);
//# sourceMappingURL=equipments.module.js.map