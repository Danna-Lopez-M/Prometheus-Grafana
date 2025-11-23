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
exports.CreateDeliveryDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class RelationDto {
    id;
}
__decorate([
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], RelationDto.prototype, "id", void 0);
class CreateDeliveryDto {
    rental;
    technician;
    client;
    actDocumentUrl;
    clientSignatureUrl;
    visualObservations;
    technicalObservations;
}
exports.CreateDeliveryDto = CreateDeliveryDto;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => RelationDto),
    __metadata("design:type", RelationDto)
], CreateDeliveryDto.prototype, "rental", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => RelationDto),
    __metadata("design:type", RelationDto)
], CreateDeliveryDto.prototype, "technician", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => RelationDto),
    __metadata("design:type", RelationDto)
], CreateDeliveryDto.prototype, "client", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDeliveryDto.prototype, "actDocumentUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDeliveryDto.prototype, "clientSignatureUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDeliveryDto.prototype, "visualObservations", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDeliveryDto.prototype, "technicalObservations", void 0);
//# sourceMappingURL=create-delivery.dto.js.map