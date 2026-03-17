var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsArray, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
class LineDto {
    menuItemId;
    quantity;
    addOnIds;
    specialInstructions;
}
__decorate([
    IsString(),
    __metadata("design:type", String)
], LineDto.prototype, "menuItemId", void 0);
__decorate([
    IsNumber(),
    Min(1),
    __metadata("design:type", Number)
], LineDto.prototype, "quantity", void 0);
__decorate([
    IsArray(),
    IsOptional(),
    __metadata("design:type", Array)
], LineDto.prototype, "addOnIds", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], LineDto.prototype, "specialInstructions", void 0);
class CustomerDto {
    name;
    phone;
    table;
}
__decorate([
    IsString(),
    __metadata("design:type", String)
], CustomerDto.prototype, "name", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], CustomerDto.prototype, "phone", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CustomerDto.prototype, "table", void 0);
export class CreateOrderDto {
    lines;
    customer;
    mockPaymentIntent;
    clientPrices;
}
__decorate([
    ValidateNested({ each: true }),
    Type(() => LineDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "lines", void 0);
__decorate([
    ValidateNested(),
    Type(() => CustomerDto),
    __metadata("design:type", CustomerDto)
], CreateOrderDto.prototype, "customer", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "mockPaymentIntent", void 0);
__decorate([
    IsOptional(),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "clientPrices", void 0);
