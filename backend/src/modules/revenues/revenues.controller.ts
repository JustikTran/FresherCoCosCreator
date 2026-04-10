import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RevenuesService } from './revenues.service';
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { UpdateRevenueDto } from './dto/update-revenue.dto';

@Controller('revenues')
export class RevenuesController {
  constructor(private readonly revenuesService: RevenuesService) { }

  @Post()
  async create(@Body() createRevenuesDto: CreateRevenueDto[]) {
    return await this.revenuesService.create(createRevenuesDto);
  }

  @Get()
  async findAll(
    @Query() query: any,
    @Query('current') current: string,
    @Query('pageSize') pageSize: string
  ) {
    return await this.revenuesService.findAll(query, current, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.revenuesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRevenueDto: UpdateRevenueDto) {
    return this.revenuesService.update(+id, updateRevenueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.revenuesService.remove(+id);
  }
}
