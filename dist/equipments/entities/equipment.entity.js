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
exports.Equipment = void 0;
const typeorm_1 = require("typeorm");
const computer_specs_entity_1 = require("./computer-specs.entity");
const printer_specs_entity_1 = require("./printer-specs.entity");
const phone_specs_entity_1 = require("./phone-specs.entity");
let Equipment = class Equipment {
    id;
    name;
    type;
    brand;
    model;
    description;
    price;
    stock;
    warrantyPeriod;
    releaseDate;
    image;
    isInRepair;
    computerSpecs;
    printerSpecs;
    phoneSpecs;
};
exports.Equipment = Equipment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Equipment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Equipment.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Equipment.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Equipment.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Equipment.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Equipment.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Equipment.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Equipment.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Equipment.prototype, "warrantyPeriod", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Equipment.prototype, "releaseDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Equipment.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Equipment.prototype, "isInRepair", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => computer_specs_entity_1.ComputerSpecs, { cascade: true, nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", computer_specs_entity_1.ComputerSpecs)
], Equipment.prototype, "computerSpecs", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => printer_specs_entity_1.PrinterSpecs, { cascade: true, nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", printer_specs_entity_1.PrinterSpecs)
], Equipment.prototype, "printerSpecs", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => phone_specs_entity_1.PhoneSpecs, { cascade: true, nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", phone_specs_entity_1.PhoneSpecs)
], Equipment.prototype, "phoneSpecs", void 0);
exports.Equipment = Equipment = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.TableInheritance)({ column: { type: 'varchar', name: 'type' } })
], Equipment);
//# sourceMappingURL=equipment.entity.js.map