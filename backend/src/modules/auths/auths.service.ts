import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Auth } from 'src/modules/auths/schemas/auth.schema';
import mongoose, { Connection, Model } from 'mongoose';
import { Queries } from 'src/utils/CQRS/query';
import { UsersService } from 'src/modules/users/users.service';
import { promises } from 'dns';

@Injectable()
export class AuthsService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    @InjectConnection() private readonly connection: Connection,
    private userService: UsersService
  ) {

  }

  async create(createAuthDto: CreateAuthDto): Promise<{ id: mongoose.Types.ObjectId }> {
    const { name, avatar, phone, role } = createAuthDto;
    let { password } = createAuthDto;
    //hash password here

    const session = await this.connection.startSession();
    session.startTransaction();

    const { id } = await this.userService.create({ name, avatar, phone });
    const account = await this.authModel.create({ userId: id, password, role, isBanned: false });

    session.commitTransaction();
    return {
      id: account._id
    };
  }

  async findAll(query: any, current: string = '1', pageSize: string = '10'): Promise<{ meta: any, data: Auth[] }> {
    return await Queries<Auth>(this.authModel, query, +current, +pageSize);
  }

  async findById(id: mongoose.Types.ObjectId): Promise<Auth> {
    const result = await this.authModel.findById(id);
    if (!result) {
      throw new NotFoundException('Account does not exist.');
    }
    return result;
  }

  async findByUserId(userId: mongoose.Types.ObjectId): Promise<Auth> {
    const result = await this.authModel.findOne(userId);
    if (!result) {
      throw new NotFoundException('Account does not exist.');
    }
    return result;
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  async remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
