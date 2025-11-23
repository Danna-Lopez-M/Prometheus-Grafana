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
exports.DeliveriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const delivery_entity_1 = require("./entities/delivery.entity");
let DeliveriesService = class DeliveriesService {
    deliveryRepo;
    constructor(deliveryRepo) {
        this.deliveryRepo = deliveryRepo;
    }
    async create(createDeliveryDto) {
        console.log('typeof rental:', typeof createDeliveryDto.rental);
        console.log('instanceof rental:', createDeliveryDto.rental instanceof Object);
        console.log('DTO recibido:', JSON.stringify(createDeliveryDto, null, 2));
        if (!createDeliveryDto.rental?.id) {
            throw new common_1.BadRequestException('El campo rental.id es requerido');
        }
        if (!createDeliveryDto.technician || !createDeliveryDto.technician.id) {
            throw new common_1.BadRequestException('El campo technician.id es requerido');
        }
        if (!createDeliveryDto.client || !createDeliveryDto.client.id) {
            throw new common_1.BadRequestException('El campo client.id es requerido');
        }
        const delivery = this.deliveryRepo.create({
            rental: { id: createDeliveryDto.rental.id },
            technician: { id: createDeliveryDto.technician.id },
            client: { id: createDeliveryDto.client.id },
            actDocumentUrl: createDeliveryDto.actDocumentUrl,
            clientSignatureUrl: createDeliveryDto.clientSignatureUrl,
            visualObservations: createDeliveryDto.visualObservations,
            technicalObservations: createDeliveryDto.technicalObservations
        });
        await this.deliveryRepo.save(delivery);
        return { message: 'Entrega creada exitosamente', delivery };
    }
    findAll() {
        return this.deliveryRepo.find({ relations: ['rental', 'technician', 'client'] });
    }
    async findOne(id) {
        const delivery = await this.deliveryRepo.findOne({
            where: { id },
            relations: ['rental', 'technician', 'client'],
        });
        if (!delivery)
            throw new common_1.NotFoundException('Delivery not found');
        return delivery;
    }
    async update(id, updateDeliveryDto) {
        const delivery = await this.deliveryRepo.findOne({ where: { id } });
        if (!delivery)
            throw new common_1.NotFoundException('Delivery not found');
        Object.assign(delivery, updateDeliveryDto);
        await this.deliveryRepo.save(delivery);
        return { message: 'Entrega/Devolución actualizada', delivery };
    }
    async remove(id) {
        const delivery = await this.deliveryRepo.findOne({ where: { id } });
        if (!delivery)
            throw new common_1.NotFoundException('Delivery not found');
        await this.deliveryRepo.remove(delivery);
        return { message: 'Deleted record' };
    }
};
exports.DeliveriesService = DeliveriesService;
exports.DeliveriesService = DeliveriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(delivery_entity_1.Delivery)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DeliveriesService);
//# sourceMappingURL=deliveries.service.js.map