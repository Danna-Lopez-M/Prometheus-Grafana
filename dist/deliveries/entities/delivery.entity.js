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
exports.Delivery = void 0;
const typeorm_1 = require("typeorm");
const rental_entity_1 = require("../../rentals/entities/rental.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Delivery = class Delivery {
    id;
    rental;
    technician;
    client;
    actDocumentUrl;
    clientSignatureUrl;
    visualObservations;
    technicalObservations;
    status;
    createdAt;
};
exports.Delivery = Delivery;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Delivery.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rental_entity_1.RentalContract, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", rental_entity_1.RentalContract)
], Delivery.prototype, "rental", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Delivery.prototype, "technician", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Delivery.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Delivery.prototype, "actDocumentUrl", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Delivery.prototype, "clientSignatureUrl", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Delivery.prototype, "visualObservations", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Delivery.prototype, "technicalObservations", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { default: 'pending' }),
    __metadata("design:type", String)
], Delivery.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Delivery.prototype, "createdAt", void 0);
exports.Delivery = Delivery = __decorate([
    (0, typeorm_1.Entity)('deliveries')
], Delivery);
//# sourceMappingURL=delivery.entity.js.map