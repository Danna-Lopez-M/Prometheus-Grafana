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
var RentalsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rental_entity_1 = require("./entities/rental.entity");
const equipments_service_1 = require("../equipments/equipments.service");
const valid_roles_1 = require("../auth/interfaces/valid-roles");
const contract_entity_1 = require("../contract/entities/contract.entity");
const contract_service_1 = require("../contract/contract.service");
let RentalsService = RentalsService_1 = class RentalsService {
    rentalRepository;
    contractRepo;
    equipmentService;
    contractService;
    logger = new common_1.Logger(RentalsService_1.name);
    constructor(rentalRepository, contractRepo, equipmentService, contractService) {
        this.rentalRepository = rentalRepository;
        this.contractRepo = contractRepo;
        this.equipmentService = equipmentService;
        this.contractService = contractService;
    }
    async createRequest(clientId, createRentalDto) {
        const equipment = await this.equipmentService.findOne(createRentalDto.equipmentId);
        if (equipment.isInRepair) {
            throw new common_1.BadRequestException('This equipment is currently under repair');
        }
        if (equipment.stock < 1) {
            throw new common_1.BadRequestException('Equipment out of stock');
        }
        if (createRentalDto.endDate <= createRentalDto.startDate) {
            throw new common_1.BadRequestException('End date must be after start date');
        }
        const rentalContract = this.rentalRepository.create({
            client: { id: clientId },
            equipment: { id: equipment.id },
            startDate: createRentalDto.startDate,
            endDate: createRentalDto.endDate,
            status: 'pending',
        });
        const savedRental = await this.rentalRepository.save(rentalContract);
        const contract = await this.contractService.createFromRental({ id: clientId }, savedRental);
        await this.contractRepo.save(contract);
        await this.equipmentService.updateStock(equipment.id, equipment.stock - 1);
        return { rentalContract: savedRental, contract };
    }
    async findByClient(clientId) {
        return this.rentalRepository.find({
            where: { client: { id: clientId } },
            relations: ['equipment'],
        });
    }
    async findAll(filterDto) {
        const { status, startDate, endDate } = filterDto;
        const where = {};
        if (status)
            where.status = status;
        if (startDate && endDate) {
            where.startDate = (0, typeorm_2.Between)(startDate, endDate);
        }
        else if (startDate) {
            where.startDate = (0, typeorm_2.MoreThanOrEqual)(startDate);
        }
        return this.rentalRepository.find({
            where,
            relations: ['client', 'equipment'],
        });
    }
    async updateStatus(id, updateDto, user) {
        const contract = await this.rentalRepository.findOne({
            where: { id },
            relations: ['equipment'],
        });
        if (!contract)
            throw new common_1.NotFoundException('Contract not found');
        if (!user.roles.includes(valid_roles_1.ValidRoles.admin) &&
            !user.roles.includes(valid_roles_1.ValidRoles.salesperson)) {
            throw new common_1.ForbiddenException('Unauthorized to update status');
        }
        if (updateDto.status === 'approved' && contract.status === 'pending') {
        }
        else if (updateDto.status === 'rejected') {
            await this.equipmentService.updateStock(contract.equipment.id, contract.equipment.stock + 1);
        }
        contract.status = updateDto.status;
        return this.rentalRepository.save(contract);
    }
    async getActiveDeliveries() {
        return this.rentalRepository.find({
            where: {
                status: 'approved',
                startDate: (0, typeorm_2.MoreThanOrEqual)(new Date()),
            },
            relations: ['client', 'equipment'],
        });
    }
    async getRentalMetrics() {
        const [active, pending] = await Promise.all([
            this.rentalRepository.count({ where: { status: 'approved' } }),
            this.rentalRepository.count({ where: { status: 'pending' } }),
        ]);
        const revenueResult = await this.rentalRepository
            .createQueryBuilder('rental')
            .select('SUM(equipment.price)', 'revenue')
            .leftJoin('rental.equipment', 'equipment')
            .where('rental.status = :status', { status: 'approved' })
            .getRawOne();
        return {
            active,
            pending,
            revenue: Number(revenueResult.revenue) || 0,
        };
    }
};
exports.RentalsService = RentalsService;
exports.RentalsService = RentalsService = RentalsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rental_entity_1.RentalContract)),
    __param(1, (0, typeorm_1.InjectRepository)(contract_entity_1.Contract)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        equipments_service_1.EquipmentsService,
        contract_service_1.ContractService])
], RentalsService);
//# sourceMappingURL=rentals.service.js.map