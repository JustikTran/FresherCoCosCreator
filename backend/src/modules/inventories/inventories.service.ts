import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Queries } from 'src/utils/CQRS/query';
import { Inventory } from './schemas/inventory.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectModel(Inventory.name) private inventoryService: Model<Inventory>
  ) { }

  async create(createInventoriesDto: CreateInventoryDto[]): Promise<(Inventory & { _id: mongoose.Types.ObjectId })[]> {
    return await this.inventoryService.create(createInventoriesDto);
  }

  async findAll(query: any, current: string = '1', pageSize: string = '10'): Promise<{ meta: any, data: Inventory[] }> {
    return await Queries<Inventory>(this.inventoryService, query, +current, +pageSize);
  }

  findOne(id: number) {
    return `This action returns a #${id} inventory`;
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return `This action updates a #${id} inventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventory`;
  }
}
