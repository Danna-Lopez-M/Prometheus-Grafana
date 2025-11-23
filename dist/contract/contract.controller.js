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
exports.ContractController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const get_user_decorator_1 = require("../auth/decorators/get-user/get-user.decorator");
const valid_roles_1 = require("../auth/interfaces/valid-roles");
const user_entity_1 = require("../users/entities/user.entity");
const contract_service_1 = require("./contract.service");
let ContractController = class ContractController {
    contractService;
    constructor(contractService) {
        this.contractService = contractService;
    }
    findAll() {
        return this.contractService.findAll();
    }
    findMyContracts(user) {
        return this.contractService.findByUser(user.id);
    }
    findOne(id, user) {
        return this.contractService.findOne(id, user);
    }
};
exports.ContractController = ContractController;
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Auth)(valid_roles_1.ValidRoles.admin, valid_roles_1.ValidRoles.salesperson),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContractController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my'),
    (0, auth_decorator_1.Auth)(valid_roles_1.ValidRoles.client),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ContractController.prototype, "findMyContracts", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_decorator_1.Auth)(valid_roles_1.ValidRoles.client),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ContractController.prototype, "findOne", null);
exports.ContractController = ContractController = __decorate([
    (0, common_1.Controller)('contracts'),
    __metadata("design:paramtypes", [contract_service_1.ContractService])
], ContractController);
//# sourceMappingURL=contract.controller.js.map