"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
const common_1 = require("@nestjs/common");
const role_protected_decorator_1 = require("./role-protected.decorator");
const user_role_guard_1 = require("../guards/user-role.guard");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
function Auth(...roles) {
    return (0, common_1.applyDecorators)((0, role_protected_decorator_1.RoleProtected)(...roles), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_role_guard_1.UserRoleGuard));
}
//# sourceMappingURL=auth.decorator.js.map