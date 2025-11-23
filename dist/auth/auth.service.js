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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const roles_service_1 = require("../roles/roles.service");
const users_service_1 = require("../users/users.service");
const valid_roles_1 = require("./interfaces/valid-roles");
let AuthService = class AuthService {
    usersService;
    rolesService;
    jwtService;
    constructor(usersService, rolesService, jwtService) {
        this.usersService = usersService;
        this.rolesService = rolesService;
        this.jwtService = jwtService;
    }
    async register(createUserDto) {
        try {
            const defaultRole = await this.rolesService.findByName(valid_roles_1.ValidRoles.client);
            if (!defaultRole) {
                throw new common_1.InternalServerErrorException('Default role not found');
            }
            const user = await this.usersService.create({
                ...createUserDto,
                roles: [valid_roles_1.ValidRoles.client],
            });
            delete user.password;
            return {
                ...user,
                token: this.getJwtToken({ id: user.id, fullName: user.fullName, roles: user.roles }),
            };
        }
        catch (error) {
            throw error;
        }
    }
    async login(loginUserDto) {
        const { email, password } = loginUserDto;
        const user = await this.usersService.findByEmail(email, true);
        if (!email || !password) {
            throw new common_1.BadRequestException('Email y contraseña son requeridos');
        }
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        if (!user.password) {
            throw new common_1.InternalServerErrorException('La contraseña no está configurada para este usuario');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const { password: _, fullName, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token: this.getJwtToken({ id: user.id, fullName: user.fullName, roles: user.roles }),
        };
    }
    async validateUser(id) {
        const user = await this.usersService.findOne(id).catch(() => null);
        if (!user || !user.isActive) {
            throw new common_1.UnauthorizedException('User not found or inactive');
        }
        return user;
    }
    getJwtToken(payload) {
        return this.jwtService.sign({
            id: payload.id,
            fullName: payload.fullName,
            roles: payload.roles,
        });
    }
    handleDBExceptions(error) {
        if (error.code === '23505') {
            throw new common_1.BadRequestException('User already exists');
        }
        throw new common_1.InternalServerErrorException(error.code);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        roles_service_1.RolesService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map