import { Controller, Get, Query } from '@nestjs/common';
import { MenuService } from './menu.service.js';

@Controller('menu')
export class MenuController {
  constructor(private readonly menu: MenuService) {}

  @Get()
  list(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('dietary') dietary?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string
  ) {
    return this.menu.list({
      search,
      category,
      dietary,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined
    });
  }
}
