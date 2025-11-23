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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalContract = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const equipment_entity_1 = require("../../equipments/entities/equipment.entity");
let RentalContract = class RentalContract {
    id;
    client;
    technical;
    equipment;
    startDate;
    endDate;
    status;
    isDisabled;
    createdAt;
    approvedBy;
    approvalDate;
    isDelivered;
    deliveryNotes;
};
exports.RentalContract = RentalContract;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RentalContract.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], RentalContract.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    __metadata("design:type", user_entity_1.User)
], RentalContract.prototype, "technical", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => equipment_entity_1.Equipment),
    __metadata("design:type", equipment_entity_1.Equipment)
], RentalContract.prototype, "equipment", void 0);
__decorate([
    (0, typeorm_1.Column)('date'),
    __metadata("design:type", Date)
], RentalContract.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)('date'),
    __metadata("design:type", Date)
], RentalContract.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { default: 'pending' }),
    __metadata("design:type", String)
], RentalContract.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], RentalContract.prototype, "isDisabled", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RentalContract.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], RentalContract.prototype, "approvedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], RentalContract.prototype, "approvalDate", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], RentalContract.prototype, "isDelivered", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], RentalContract.prototype, "deliveryNotes", void 0);
exports.RentalContract = RentalContract = __decorate([
    (0, typeorm_1.Entity)('rental_contracts')
], RentalContract);
//# sourceMappingURL=rental.entity.js.map