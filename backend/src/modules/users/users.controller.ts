import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(
    @Query() query: any,
    @Query('current') current: string,
    @Query('pageSize') pageSize: string
  ) {
    return await this.usersService.findAll(query, current, pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: mongoose.Types.ObjectId) {
    return await this.usersService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: mongoose.Types.ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: mongoose.Types.ObjectId) {
    return await this.usersService.remove(id);
  }
}
