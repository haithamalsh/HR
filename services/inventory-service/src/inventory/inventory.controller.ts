import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly svc: InventoryService) {}

  @Get()
  async list() {
    return this.svc.list();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const item = await this.svc.get(id);
    if (!item) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return item;
  }

  @Post('items')
  async create(@Body() body: any) {
    if (!body.name) throw new HttpException('name required', HttpStatus.BAD_REQUEST);
    return this.svc.create(body);
  }
}
