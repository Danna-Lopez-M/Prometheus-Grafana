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
exports.LabsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lab_entity_1 = require("./entities/lab.entity");
const rental_entity_1 = require("../rentals/entities/rental.entity");
const contract_entity_1 = require("../contract/entities/contract.entity");
const equipment_entity_1 = require("../equipments/entities/equipment.entity");
let LabsService = class LabsService {
    labRepo;
    rentalRepo;
    contractRepo;
    equipmentRepo;
    constructor(labRepo, rentalRepo, contractRepo, equipmentRepo) {
        this.labRepo = labRepo;
        this.rentalRepo = rentalRepo;
        this.contractRepo = contractRepo;
        this.equipmentRepo = equipmentRepo;
    }
    async create(createLabDto) {
        const lab = this.labRepo.create(createLabDto);
        await this.labRepo.save(lab);
        return { message: 'Laboratorio creado exitosamente', lab };
    }
    async findAll() {
        const labs = await this.labRepo.find({ relations: ['equipment', 'reportedBy'] });
        return { message: 'Laboratorios encontrados', labs };
    }
    async findOne(id) {
        const lab = await this.labRepo.findOne({
            where: { id: id.toString() },
            relations: ['equipment', 'reportedBy'],
        });
        if (!lab)
            throw new common_1.NotFoundException(`Lab with ID ${id} not found`);
        return { message: 'Laboratorio encontrado', lab };
    }
    async update(id, updateLabDto) {
        const lab = await this.labRepo.findOne({ where: { id: id.toString() } });
        if (!lab)
            throw new common_1.NotFoundException(`Lab with ID ${id} not found`);
        Object.assign(lab, updateLabDto);
        await this.labRepo.save(lab);
        return { message: 'Laboratorio actualizado exitosamente', lab };
    }
    async remove(id) {
        const lab = await this.labRepo.findOne({ where: { id: id.toString() } });
        if (!lab)
            throw new common_1.NotFoundException(`Lab with ID ${id} not found`);
        await this.labRepo.remove(lab);
        return { message: 'Laboratorio eliminado exitosamente' };
    }
    async reportBrokenEquipment(userId, contractId, notes) {
        const contract = await this.rentalRepo.findOne({
            where: { id: contractId },
            relations: ['equipment', 'client'],
        });
        if (!contract)
            throw new common_1.NotFoundException('Contract not found');
        if (contract.client.id !== userId)
            throw new common_1.BadRequestException('Unauthorized report');
        const lab = this.labRepo.create({
            equipment: contract.equipment,
            reportedBy: contract.client,
            notes,
        });
        await this.labRepo.save(lab);
        contract.isDisabled = true;
        await this.rentalRepo.save(contract);
        contract.equipment.isInRepair = true;
        await this.equipmentRepo.save(contract.equipment);
        return { message: 'Equipo reportado y enviado al laboratorio', lab };
    }
    async markAsRepaired(labId) {
        const lab = await this.labRepo.findOne({
            where: { id: labId },
            relations: ['equipment'],
        });
        if (!lab)
            throw new common_1.NotFoundException('Lab record not found');
        lab.isRepaired = true;
        await this.labRepo.save(lab);
        lab.equipment.isInRepair = false;
        lab.equipment.stock += 1;
        await this.equipmentRepo.save(lab.equipment);
        return { message: 'Equipo marcado como reparado y disponible nuevamente' };
    }
};
exports.LabsService = LabsService;
exports.LabsService = LabsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lab_entity_1.Lab)),
    __param(1, (0, typeorm_1.InjectRepository)(rental_entity_1.RentalContract)),
    __param(2, (0, typeorm_1.InjectRepository)(contract_entity_1.Contract)),
    __param(3, (0, typeorm_1.InjectRepository)(equipment_entity_1.Equipment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LabsService);
//# sourceMappingURL=labs.service.js.map