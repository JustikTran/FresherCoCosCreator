import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductOptionDto } from './dto/create-product-option.dto';
import { UpdateProductOptionDto } from './dto/update-product-option.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ProductOption } from './schemas/product-option.schema';
import mongoose, { Model } from 'mongoose';
import { Queries } from 'src/utils/CQRS/query';

@Injectable()
export class ProductOptionsService {
  constructor(@InjectModel(ProductOption.name) private optionService: Model<ProductOption>) { }

  async create(createProductOptionDto: CreateProductOptionDto[]): Promise<ProductOption[]> {
    return await this.optionService.create(createProductOptionDto);
  }

  async findAll(query: any, current: string, pageSize: string): Promise<{ meta: any, data: ProductOption[] }> {
    return await Queries<ProductOption>(this.optionService, query, +current, +pageSize);
  }

  async findOne(id: mongoose.Types.ObjectId): Promise<ProductOption> {
    const option = await this.optionService.findById(id);
    if (!option) {
      throw new NotFoundException('Product option doest not be found.');
    }
    return option;
  }

  async update(id: number, updateProductOptionDto: UpdateProductOptionDto) {
    return `This action updates a #${id} productOption`;
  }

  async remove(id: number) {
    return `This action removes a #${id} productOption`;
  }
}
