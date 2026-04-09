import { Injectable } from '@nestjs/common';
import { CreateProductCostDto } from './dto/create-product-cost.dto';
import { UpdateProductCostDto } from './dto/update-product-cost.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ProductCost } from './schemas/product-cost.schema';
import mongoose, { Model } from 'mongoose';
import { Queries } from 'src/utils/CQRS/query';

@Injectable()
export class ProductCostsService {
  constructor(
    @InjectModel(ProductCost.name) private productCodeModel: Model<ProductCost>
  ) { }
  async create(createProductCostDto: CreateProductCostDto[]): Promise<ProductCost[]> {
    return await this.productCodeModel.create(createProductCostDto);
  }

  async findAll(query: any, current: string = '1', pageSize: string = '10'): Promise<{ meta: any, data: ProductCost[] }> {
    return await Queries<ProductCost>(this.productCodeModel, query, +current, +pageSize);
  }

  async findOne(id: mongoose.Types.ObjectId) {
    return `This action returns a #${id} productCost`;
  }

  update(id: number, updateProductCostDto: UpdateProductCostDto) {
    return `This action updates a #${id} productCost`;
  }

  remove(id: number) {
    return `This action removes a #${id} productCost`;
  }
}
