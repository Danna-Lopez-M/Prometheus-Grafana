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
exports.ContractService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const contract_entity_1 = require("./entities/contract.entity");
const typeorm_2 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const contract_detail_dto_1 = require("./dto/contract-detail.dto");
let ContractService = class ContractService {
    contractRepo;
    constructor(contractRepo) {
        this.contractRepo = contractRepo;
    }
    async createFromRental(user, rental) {
        const contract = this.contractRepo.create({
            contract_id: `CTR-${Date.now()}`,
            contract_number: `CN-${Math.floor(Math.random() * 10000)}`,
            start_date: rental.startDate,
            end_date: rental.endDate,
            monthly_value: rental.equipment?.price || 0,
            user: user,
            rental: rental,
        });
        return await this.contractRepo.save(contract);
    }
    async findAll() {
        return this.contractRepo.find({
            relations: ['user', 'rental'],
        });
    }
    async findByUser(userId) {
        return this.contractRepo.find({
            where: { user: { id: userId } },
            relations: ['rental', 'user'],
        });
    }
    async findOne(id, user) {
        const contract = await this.contractRepo.findOne({
            where: { contract_id: id },
            relations: ['user', 'rental', 'rental.equipment'],
        });
        if (!contract) {
            throw new common_1.NotFoundException(`Contract with ID ${id} not found`);
        }
        if (user && user.roles.includes('client') && contract.user.id !== user.id) {
            throw new common_1.NotFoundException(`Contract with ID ${id} not found`);
        }
        return (0, class_transformer_1.plainToInstance)(contract_detail_dto_1.ContractDetailDto, {
            ...contract,
            user: {
                id: contract.user.id,
                name: contract.user.fullName,
                email: contract.user.email,
            },
            rental: {
                id: contract.rental?.id ?? 'N/A',
                equipmentName: contract.rental?.equipment?.name ?? 'N/A',
                startDate: contract.rental?.startDate ?? 'N/A',
                endDate: contract.rental?.endDate ?? 'N/A',
            },
        });
    }
};
exports.ContractService = ContractService;
exports.ContractService = ContractService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contract_entity_1.Contract)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContractService);
//# sourceMappingURL=contract.service.js.map