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
exports.RentalsController = void 0;
const common_1 = require("@nestjs/common");
const rentals_service_1 = require("./rentals.service");
const create_rental_dto_1 = require("./dto/create-rental.dto");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const valid_roles_1 = require("../auth/interfaces/valid-roles");
const get_user_decorator_1 = require("../auth/decorators/get-user/get-user.decorator");
const user_entity_1 = require("../users/entities/user.entity");
const update_rental_status_dto_1 = require("./dto/update-rental-status.dto");
const filter_rental_dto_1 = require("./dto/filter-rental.dto");
let RentalsController = class RentalsController {
    rentalsService;
    constructor(rentalsService) {
        this.rentalsService = rentalsService;
    }
    createRequest(createRentalDto, client) {
        return this.rentalsService.createRequest(client.id, createRentalDto);
    }
    findMyContracts(client) {
        return this.rentalsService.findByClient(client.id);
    }
    findAll(filterDto) {
        return this.rentalsService.findAll(filterDto);
    }
    updateStatus(id, updateDto, user) {
        return this.rentalsService.updateStatus(id, updateDto, user);
    }
    getActiveDeliveries() {
        return this.rentalsService.getActiveDeliveries();
    }
    getMetrics() {
        return this.rentalsService.getRentalMetrics();
    }
};
exports.RentalsController = RentalsController;
__decorate([
    (0, common_1.Post)('request'),
    (0, auth_decorator_1.Auth)(valid_roles_1.ValidRoles.client, valid_roles_1.ValidRoles.admin),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rental_dto_1.CreateRentalDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], RentalsController.prototype, "createRequest", null);
__decorate([
    (0, common_1.Get)('my-contracts'),
    (0, auth_decorator_1.Auth)(valid_roles_1.ValidRoles.client, valid_roles_1.ValidRoles.admin),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], RentalsController.prototype, "findMyContracts", null);
__decorate([
    (0, common_1.Get)(''),
    (0, auth_decorator_1.Auth)(valid_roles_1.ValidRoles.admin, valid_roles_1.ValidRoles.salesperson),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_rental_dto_1.FilterRentalsDto]),
    __metadata("design:returntype", void 0)
], RentalsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, auth_decorator_1.Auth)(valid_roles_1.ValidRoles.admin, valid_roles_1.ValidRoles.salesperson),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_rental_status_dto_1.UpdateRentalStatusDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], RentalsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)('active-deliveries'),
    (0, auth_decorator_1.Auth)(valid_roles_1.ValidRoles.technician, valid_roles_1.ValidRoles.admin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RentalsController.prototype, "getActiveDeliveries", null);
__decorate([
    (0, common_1.Get)('metrics'),
    (0, auth_decorator_1.Auth)(valid_roles_1.ValidRoles.admin, valid_roles_1.ValidRoles.salesperson),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RentalsController.prototype, "getMetrics", null);
exports.RentalsController = RentalsController = __decorate([
    (0, common_1.Controller)('rentals'),
    __metadata("design:paramtypes", [rentals_service_1.RentalsService])
], RentalsController);
//# sourceMappingURL=rentals.controller.js.map