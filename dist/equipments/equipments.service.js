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
exports.EquipmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const equipment_entity_1 = require("./entities/equipment.entity");
const computer_specs_entity_1 = require("./entities/computer-specs.entity");
const printer_specs_entity_1 = require("./entities/printer-specs.entity");
const phone_specs_entity_1 = require("./entities/phone-specs.entity");
let EquipmentsService = class EquipmentsService {
    equipmentRepo;
    computerSpecsRepo;
    printerSpecsRepo;
    phoneSpecsRepo;
    constructor(equipmentRepo, computerSpecsRepo, printerSpecsRepo, phoneSpecsRepo) {
        this.equipmentRepo = equipmentRepo;
        this.computerSpecsRepo = computerSpecsRepo;
        this.printerSpecsRepo = printerSpecsRepo;
        this.phoneSpecsRepo = phoneSpecsRepo;
    }
    async create(createEquipmentDto) {
        const equipment = new equipment_entity_1.Equipment();
        const { computerSpecs, printerSpecs, phoneSpecs, ...equipmentData } = createEquipmentDto;
        Object.assign(equipment, equipmentData);
        if (createEquipmentDto.releaseDate) {
            equipment.releaseDate = new Date(createEquipmentDto.releaseDate);
        }
        switch (createEquipmentDto.type.toLowerCase()) {
            case 'computer':
                if (computerSpecs) {
                    const compSpec = this.computerSpecsRepo.create(computerSpecs);
                    equipment.computerSpecs = await this.computerSpecsRepo.save(compSpec);
                }
                break;
            case 'printer':
                if (printerSpecs) {
                    const printerSpec = this.printerSpecsRepo.create(printerSpecs);
                    equipment.printerSpecs = await this.printerSpecsRepo.save(printerSpec);
                }
                break;
            case 'phone':
                if (phoneSpecs) {
                    const phoneSpec = this.phoneSpecsRepo.create(phoneSpecs);
                    equipment.phoneSpecs = await this.phoneSpecsRepo.save(phoneSpec);
                }
                break;
            default:
                throw new Error('Tipo de equipo no soportado');
        }
        return this.equipmentRepo.save(equipment);
    }
    async findAll() {
        const equipments = await this.equipmentRepo.find({
            relations: ['computerSpecs', 'printerSpecs', 'phoneSpecs'],
        });
        return equipments.map(e => this.toResponseDto(e));
    }
    async findOne(id) {
        const equipment = await this.equipmentRepo.findOne({
            where: { id },
            relations: ['computerSpecs', 'printerSpecs', 'phoneSpecs'],
        });
        if (!equipment) {
            throw new Error('Equipment not found');
        }
        return equipment;
    }
    async update(id, data) {
        const equipment = await this.equipmentRepo.findOne({
            where: { id },
            relations: ['computerSpecs', 'printerSpecs', 'phoneSpecs'],
        });
        if (!equipment) {
            throw new Error('Equipo no encontrado');
        }
        Object.assign(equipment, data);
        switch (equipment.type) {
            case 'computer':
                if (equipment.computerSpecs) {
                    Object.assign(equipment.computerSpecs, data.specifications);
                    await this.computerSpecsRepo.save(equipment.computerSpecs);
                }
                break;
            case 'printer':
                if (equipment.printerSpecs) {
                    Object.assign(equipment.printerSpecs, data.specifications);
                    await this.printerSpecsRepo.save(equipment.printerSpecs);
                }
                break;
            case 'phone':
                if (equipment.phoneSpecs) {
                    Object.assign(equipment.phoneSpecs, data.specifications);
                    await this.phoneSpecsRepo.save(equipment.phoneSpecs);
                }
                break;
        }
        return this.equipmentRepo.save(equipment);
    }
    async remove(id) {
        const equipment = await this.equipmentRepo.findOne({
            where: { id },
            relations: ['computerSpecs', 'printerSpecs', 'phoneSpecs'],
        });
        if (!equipment) {
            throw new Error('Equipo no encontrado');
        }
        switch (equipment.type) {
            case 'computer':
                if (equipment.computerSpecs) {
                    await this.computerSpecsRepo.remove(equipment.computerSpecs);
                }
                break;
            case 'printer':
                if (equipment.printerSpecs) {
                    await this.printerSpecsRepo.remove(equipment.printerSpecs);
                }
                break;
            case 'phone':
                if (equipment.phoneSpecs) {
                    await this.phoneSpecsRepo.remove(equipment.phoneSpecs);
                }
                break;
        }
        await this.equipmentRepo.remove(equipment);
    }
    async updateStock(id, newStock) {
        const equipment = await this.equipmentRepo.findOne({ where: { id } });
        if (!equipment) {
            throw new Error('Equipment not found');
        }
        equipment.stock = newStock;
        return this.equipmentRepo.save(equipment);
    }
    toResponseDto(equipment) {
        let status;
        if (equipment.isInRepair) {
            status = 'in-repair';
        }
        else if (equipment.stock < 1) {
            status = 'out-of-stock';
        }
        else {
            status = 'available';
        }
        return {
            ...equipment,
            status,
        };
    }
};
exports.EquipmentsService = EquipmentsService;
exports.EquipmentsService = EquipmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(equipment_entity_1.Equipment)),
    __param(1, (0, typeorm_1.InjectRepository)(computer_specs_entity_1.ComputerSpecs)),
    __param(2, (0, typeorm_1.InjectRepository)(printer_specs_entity_1.PrinterSpecs)),
    __param(3, (0, typeorm_1.InjectRepository)(phone_specs_entity_1.PhoneSpecs)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EquipmentsService);
//# sourceMappingURL=equipments.service.js.map