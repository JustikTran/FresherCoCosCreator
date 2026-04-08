import { Injectable } from '@nestjs/common';
import { CreateProductCostDto } from './dto/create-product-cost.dto';
import { UpdateProductCostDto } from './dto/update-product-cost.dto';

@Injectable()
export class ProductCostsService {
  create(createProductCostDto: CreateProductCostDto) {
    return 'This action adds a new productCost';
  }

  findAll() {
    return `This action returns all productCosts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productCost`;
  }

  update(id: number, updateProductCostDto: UpdateProductCostDto) {
    return `This action updates a #${id} productCost`;
  }

  remove(id: number) {
    return `This action removes a #${id} productCost`;
  }
}
