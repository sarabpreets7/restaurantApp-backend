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
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { MenuService } from './menu.service.js';
let MenuController = class MenuController {
    menuService;
    constructor(menuService) {
        this.menuService = menuService;
    }
    list(search, category, dietary, minPrice, maxPrice) {
        const normalize = (v) => (v != null && v.trim().length ? v : undefined);
        return this.menuService.list({
            search: normalize(search),
            category: normalize(category),
            dietary: normalize(dietary),
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined
        });
    }
};
__decorate([
    Get(),
    __param(0, Query('search')),
    __param(1, Query('category')),
    __param(2, Query('dietary')),
    __param(3, Query('minPrice')),
    __param(4, Query('maxPrice')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "list", null);
MenuController = __decorate([
    Controller('menu'),
    __param(0, Inject(MenuService)),
    __metadata("design:paramtypes", [MenuService])
], MenuController);
export { MenuController };
