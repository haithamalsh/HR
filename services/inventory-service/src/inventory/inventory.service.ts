import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class InventoryService implements OnModuleDestroy {
  prisma = new PrismaClient();

  async list() {
    return this.prisma.inventoryItem.findMany();
  }

  async get(id: string) {
    return this.prisma.inventoryItem.findUnique({ where: { id } });
  }

  async create(data: { name: string; quantity?: number; minLevel?: number }) {
    return this.prisma.inventoryItem.create({ data });
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}
