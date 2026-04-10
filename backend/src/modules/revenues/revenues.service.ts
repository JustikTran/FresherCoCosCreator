import { Injectable } from '@nestjs/common';
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { UpdateRevenueDto } from './dto/update-revenue.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Revenue } from './schemas/revenue.schema';
import mongoose, { Model } from 'mongoose';
import { Queries } from 'src/utils/CQRS/query';

@Injectable()
export class RevenuesService {
  constructor(
    @InjectModel(Revenue.name) private revenueModel: Model<Revenue>
  ) { }

  async create(createRevenuesDto: CreateRevenueDto[]): Promise<(Revenue & { _id: mongoose.Types.ObjectId })[]> {
    return await this.revenueModel.create(createRevenuesDto);
  }

  async findAll(query: any, current: string = '1', pageSize: string = '10'): Promise<{ meta: any, data: Revenue[] }> {
    return await Queries<Revenue>(this.revenueModel, query, +current, +pageSize);
  }

  findOne(id: number) {
    return `This action returns a #${id} revenue`;
  }

  update(id: number, updateRevenueDto: UpdateRevenueDto) {
    return `This action updates a #${id} revenue`;
  }

  remove(id: number) {
    return `This action removes a #${id} revenue`;
  }
}
