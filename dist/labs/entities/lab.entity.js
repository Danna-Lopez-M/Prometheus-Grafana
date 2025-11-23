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
exports.Lab = void 0;
const typeorm_1 = require("typeorm");
const equipment_entity_1 = require("../../equipments/entities/equipment.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Lab = class Lab {
    id;
    equipment;
    reportedBy;
    reportedAt;
    notes;
    isRepaired;
};
exports.Lab = Lab;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Lab.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => equipment_entity_1.Equipment),
    (0, typeorm_1.JoinColumn)({ name: 'equipment_id' }),
    __metadata("design:type", equipment_entity_1.Equipment)
], Lab.prototype, "equipment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'reported_by' }),
    __metadata("design:type", user_entity_1.User)
], Lab.prototype, "reportedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Lab.prototype, "reportedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Lab.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Lab.prototype, "isRepaired", void 0);
exports.Lab = Lab = __decorate([
    (0, typeorm_1.Entity)('labs')
], Lab);
//# sourceMappingURL=lab.entity.js.map