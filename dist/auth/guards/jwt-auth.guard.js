"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    canActivate(context) {
        console.log('JwtAuthGuard - canActivate');
        return super.canActivate(context);
    }
    handleRequest(err, user, info) {
        console.log('JwtAuthGuard - handleRequest');
        console.log('Error:', err);
        console.log('User:', user);
        console.log('Info:', info);
        if (err || !user) {
            console.error('Error de autenticación:', info?.message);
            throw new common_1.UnauthorizedException(info?.message || 'Invalid token');
        }
        if (!user.roles || !Array.isArray(user.roles)) {
            console.error('Usuario sin roles válidos');
            throw new common_1.UnauthorizedException('User has no valid roles');
        }
        return user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map