"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissions = exports.ValidRoles = void 0;
var ValidRoles;
(function (ValidRoles) {
    ValidRoles["admin"] = "admin";
    ValidRoles["client"] = "client";
    ValidRoles["salesperson"] = "salesperson";
    ValidRoles["technician"] = "technician";
    ValidRoles["labTechnician"] = "labTechnician";
})(ValidRoles || (exports.ValidRoles = ValidRoles = {}));
exports.RolePermissions = {
    [ValidRoles.client]: [
        'view-own-contracts',
        'view-own-equipment',
        'create-requests'
    ],
    [ValidRoles.salesperson]: [
        'manage-requests',
        'manage-contracts',
        'manage-delivery-notes'
    ],
    [ValidRoles.technician]: [
        'register-deliveries',
        'register-returns',
        'register-visual-observations'
    ],
    [ValidRoles.labTechnician]: [
        'register-technical-observations',
        'change-equipment-status'
    ],
    [ValidRoles.admin]: [
        'manage-users',
        'manage-products',
        'manage-reports',
        'manage-roles',
        'view-all-contracts',
        'view-all-equipment'
    ]
};
//# sourceMappingURL=valid-roles.js.map