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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        try {
            const { password, ...rest } = createUserDto;
            const hashedPassword = bcrypt.hashSync(password, 10);
            const user = this.userRepository.create({
                ...rest,
                password: hashedPassword,
                roles: createUserDto.roles || ['client'],
            });
            return await this.userRepository.save(user);
        }
        catch (error) {
            this.handleDBExceptions(error);
        }
    }
    async findAll() {
        return this.userRepository.find();
    }
    async findOne(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        return user;
    }
    async update(id, updateUserDto) {
        let passwordChanged = false;
        if (updateUserDto.password) {
            updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 10);
            passwordChanged = true;
        }
        const user = await this.userRepository.preload({
            id,
            ...updateUserDto,
        });
        if (!user)
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        try {
            await this.userRepository.save(user);
            const { password: _, ...userWithoutPassword } = user;
            return {
                user: userWithoutPassword,
                passwordChanged
            };
        }
        catch (error) {
            this.handleDBExceptions(error);
        }
    }
    async remove(id) {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
    }
    async findByEmail(email, withPassword = false) {
        const query = this.userRepository.createQueryBuilder('user')
            .where('user.email = :email', { email: email.toLowerCase() });
        if (withPassword) {
            query.addSelect('user.password');
        }
        return query.getOne();
    }
    async updateUserRoles(id, roles) {
        const user = await this.findOne(id);
        user.roles = roles;
        return this.userRepository.save(user);
    }
    async toggleUserStatus(id) {
        const user = await this.findOne(id);
        user.isActive = !user.isActive;
        return this.userRepository.save(user);
    }
    handleDBExceptions(error) {
        if (error.code === '23505') {
            throw new common_1.BadRequestException('Email already exists');
        }
        throw new common_1.InternalServerErrorException('Unexpected error, check server logs');
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map