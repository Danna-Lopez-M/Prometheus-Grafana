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
exports.CreateEquipmentDto = exports.PhoneSpecsDto = exports.PrinterSpecsDto = exports.ComputerSpecsDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ComputerSpecsDto {
    processor;
    ram;
    storage;
    os;
}
exports.ComputerSpecsDto = ComputerSpecsDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ComputerSpecsDto.prototype, "processor", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ComputerSpecsDto.prototype, "ram", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ComputerSpecsDto.prototype, "storage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ComputerSpecsDto.prototype, "os", void 0);
class PrinterSpecsDto {
    printTechnology;
    resolution;
    connectivity;
}
exports.PrinterSpecsDto = PrinterSpecsDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrinterSpecsDto.prototype, "printTechnology", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrinterSpecsDto.prototype, "resolution", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrinterSpecsDto.prototype, "connectivity", void 0);
class PhoneSpecsDto {
    screenSize;
    battery;
    camera;
    os;
}
exports.PhoneSpecsDto = PhoneSpecsDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PhoneSpecsDto.prototype, "screenSize", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PhoneSpecsDto.prototype, "battery", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PhoneSpecsDto.prototype, "camera", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PhoneSpecsDto.prototype, "os", void 0);
class CreateEquipmentDto {
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
    computerSpecs;
    printerSpecs;
    phoneSpecs;
}
exports.CreateEquipmentDto = CreateEquipmentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "brand", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "model", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEquipmentDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEquipmentDto.prototype, "stock", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "warrantyPeriod", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "releaseDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ComputerSpecsDto),
    __metadata("design:type", ComputerSpecsDto)
], CreateEquipmentDto.prototype, "computerSpecs", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PrinterSpecsDto),
    __metadata("design:type", PrinterSpecsDto)
], CreateEquipmentDto.prototype, "printerSpecs", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PhoneSpecsDto),
    __metadata("design:type", PhoneSpecsDto)
], CreateEquipmentDto.prototype, "phoneSpecs", void 0);
//# sourceMappingURL=create-equipment.dto.js.map