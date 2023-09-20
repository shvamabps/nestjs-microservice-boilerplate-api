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
exports.LoginController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const adapter_1 = require("./adapter");
const swagger_2 = require("./swagger");
let LoginController = class LoginController {
    constructor(loginService) {
        this.loginService = loginService;
    }
    async login({ body, user, tracing }) {
        return this.loginService.execute(body, { user, tracing });
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    (0, swagger_1.ApiResponse)(swagger_2.SwagggerResponse.login[200]),
    (0, swagger_1.ApiResponse)(swagger_2.SwagggerResponse.login[404]),
    (0, swagger_1.ApiBody)(swagger_2.SwagggerRequest.body),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], LoginController.prototype, "login", null);
LoginController = __decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('login'),
    __metadata("design:paramtypes", [adapter_1.ILoginAdapter])
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=controller.js.map