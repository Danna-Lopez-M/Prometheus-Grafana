"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentsController = void 0;
const common_1 = require("@nestjs/common");
const equipments_service_1 = require("./equipments.service");
const create_equipment_dto_1 = require("./dto/create-equipment.dto");
const update_equipment_dto_1 = require("./dto/update-equipment.dto");
let EquipmentsController = class EquipmentsController {
    equipmentsService;
    constructor(equipmentsService) {
        this.equipmentsService = equipmentsService;
    }
    create(createEquipmentDto) {
        return this.equipmentsService.create(createEquipmentDto);
    }
    findAll() {
        return this.equipmentsService.findAll();
    }
    findOne(id) {
        return this.equipmentsService.findOne(id);
    }
    async update(id, updateEquipmentDto) {
        return this.equipmentsService.update(id, updateEquipmentDto);
    }
    async remove(id) {
        return this.equipmentsService.remove(id);
    }
};
exports.EquipmentsController = EquipmentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_equipment_dto_1.CreateEquipmentDto]),
    __metadata("design:returntype", Promise)
], EquipmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EquipmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EquipmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_equipment_dto_1.UpdateEquipmentDto]),
    __metadata("design:returntype", Promise)
], EquipmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EquipmentsController.prototype, "remove", null);
exports.EquipmentsController = EquipmentsController = __decorate([
    (0, common_1.Controller)('equipments'),
    __metadata("design:paramtypes", [equipments_service_1.EquipmentsService])
], EquipmentsController);
//# sourceMappingURL=equipments.controller.js.map