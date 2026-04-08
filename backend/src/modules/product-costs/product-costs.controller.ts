import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductCostsService } from './product-costs.service';
import { CreateProductCostDto } from './dto/create-product-cost.dto';
import { UpdateProductCostDto } from './dto/update-product-cost.dto';

@Controller('product-costs')
export class ProductCostsController {
  constructor(private readonly productCostsService: ProductCostsService) {}

  @Post()
  create(@Body() createProductCostDto: CreateProductCostDto) {
    return this.productCostsService.create(createProductCostDto);
  }

  @Get()
  findAll() {
    return this.productCostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCostsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductCostDto: UpdateProductCostDto) {
    return this.productCostsService.update(+id, updateProductCostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCostsService.remove(+id);
  }
}
