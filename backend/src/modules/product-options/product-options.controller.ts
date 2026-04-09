import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductOptionsService } from './product-options.service';
import { CreateProductOptionDto } from './dto/create-product-option.dto';
import { UpdateProductOptionDto } from './dto/update-product-option.dto';
import mongoose from 'mongoose';

@Controller('product-options')
export class ProductOptionsController {
  constructor(private readonly productOptionsService: ProductOptionsService) { }

  @Post()
  async create(@Body() createProductOptionDto: CreateProductOptionDto[]) {
    return this.productOptionsService.create(createProductOptionDto);
  }

  @Get()
  async findAll(
    @Query() query: any,
    @Query('current') current: string,
    @Query('pageSize') pageSize: string
  ) {
    return this.productOptionsService.findAll(query, current, pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: mongoose.Types.ObjectId) {
    return this.productOptionsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductOptionDto: UpdateProductOptionDto) {
    return this.productOptionsService.update(+id, updateProductOptionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productOptionsService.remove(+id);
  }
}
