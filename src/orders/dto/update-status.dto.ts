import { IsIn, IsString } from 'class-validator';
import type { OrderStatus } from '../../common/types.js';

export class UpdateStatusDto {
  @IsString()
  @IsIn(['received', 'preparing', 'ready', 'completed', 'failed'])
  status!: OrderStatus;
}
