import { IsIn, IsString, IsOptional, IsNumber } from 'class-validator';
import type { OrderStatus } from '../../shared/types.js';

export class UpdateStatusDto {
  @IsString()
  @IsIn(['received', 'preparing', 'ready', 'completed', 'failed'])
  status!: OrderStatus;

  @IsOptional()
  @IsNumber()
  version?: number;
}
