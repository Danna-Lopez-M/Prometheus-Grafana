"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLabDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_lab_dto_1 = require("./create-lab.dto");
class UpdateLabDto extends (0, swagger_1.PartialType)(create_lab_dto_1.CreateLabDto) {
}
exports.UpdateLabDto = UpdateLabDto;
//# sourceMappingURL=update-lab.dto.js.map