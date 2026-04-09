import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductCostsService } from './product-costs.service';
import { CreateProductCostDto } from './dto/create-product-cost.dto';
import { UpdateProductCostDto } from './dto/update-product-cost.dto';
import mongoose from 'mongoose';

@Controller('product-costs')
export class ProductCostsController {
  constructor(private readonly productCostsService: ProductCostsService) { }

  @Post()
  async create(@Body() createProductCostDto: CreateProductCostDto[]) {
    return await this.productCostsService.create(createProductCostDto);
  }

  @Get()
  async findAll(
    @Query() query: any,
    @Query('current') current: string,
    @Query('pageSize') pageSize: string
  ) {
    return await this.productCostsService.findAll(query, current, pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: mongoose.Types.ObjectId) {
    return await this.productCostsService.findOne(id);
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
