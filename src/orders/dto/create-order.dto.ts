import { IsArray, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class LineDto {
  @IsString()
  menuItemId!: string;

  @IsNumber()
  @Min(1)
  quantity!: number;

  @IsArray()
  @IsOptional()
  addOnIds?: string[];

  @IsString()
  @IsOptional()
  specialInstructions?: string;
}

class CustomerDto {
  @IsString()
  name!: string;

  @IsString()
  phone!: string;

  @IsString()
  @IsOptional()
  table?: string;
}

export class CreateOrderDto {
  @ValidateNested({ each: true })
  @Type(() => LineDto)
  lines!: LineDto[];

  @ValidateNested()
  @Type(() => CustomerDto)
  customer!: CustomerDto;

  @IsString()
  @IsOptional()
  mockPaymentIntent?: 'force-fail' | 'force-success';

  @IsOptional()
  clientPrices?: Array<{ id: string; price: number; stock: number; addOns: any[] }>;
}
