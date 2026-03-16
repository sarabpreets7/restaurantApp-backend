import { Controller, Get, Inject, Query } from '@nestjs/common';
import { MenuService } from './menu.service.js';

@Controller('menu')
export class MenuController {
  constructor(@Inject(MenuService) private readonly menuService: MenuService) {}

  @Get()
  list(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('dietary') dietary?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string
  ) {
    const normalize = (v?: string) => (v != null && v.trim().length ? v : undefined);
    return this.menuService.list({
      search: normalize(search),
      category: normalize(category),
      dietary: normalize(dietary),
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined
    });
  }
}
