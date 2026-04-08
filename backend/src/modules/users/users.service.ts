import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/modules/users/schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<string | object> {
    const existing = await this.findByPhone(createUserDto.phone);
    if (existing) {
      throw new ConflictException('Phone number has been used.');
    }

    const newUser = await this.userModel.create({ ...createUserDto });
    return {
      id: newUser._id
    }
  }

  async findAll(query: any, current: string = '1', pageSize: string = '10'): Promise<{ meta: any, data: User[] }> {
    const { filter, sort } = aqp(query);

    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    const total = (await this.userModel.find(filter)).length;
    const totalPage = Math.ceil(total / +pageSize);

    const skip = (+current - 1) * + (+pageSize);

    const result = await this.userModel
      .find(filter)
      .skip(skip)
      .limit(+pageSize)
      .sort(sort as any);

    return {
      meta: {
        current: current,
        pageSize: pageSize,
        total: total,
        totalPage: totalPage
      },
      data: result
    };
  }

  async findById(id: mongoose.Types.ObjectId): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User does not be found.');
    return user;
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = await this.userModel.findOne({ phone: phone });
    return user;
  }

  async update(id: mongoose.Types.ObjectId, updateUserDto: UpdateUserDto): Promise<string | object> {
    const exist = await this.findByPhone(updateUserDto.phone);
    if (exist) {
      throw new ConflictException('Phone number has been used.');
    }
    const updated = await this.userModel.findByIdAndUpdate(
      id,
      { ...updateUserDto }
      ,
      { new: true }
    );

    return {
      id: updated?._id
    }
  }

  async remove(id: mongoose.Types.ObjectId): Promise<string | object> {
    const deleted = await this.userModel.findByIdAndUpdate(id, {
      deletedAt: new Date()
    }, { new: true })
    return {
      id: deleted?._id
    };
  }
}
