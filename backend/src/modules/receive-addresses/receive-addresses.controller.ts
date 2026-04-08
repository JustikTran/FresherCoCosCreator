import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReceiveAddressesService } from './receive-addresses.service';
import { CreateReceiveAddressDto } from './dto/create-receive-address.dto';
import { UpdateReceiveAddressDto } from './dto/update-receive-address.dto';

@Controller('receive-addresses')
export class ReceiveAddressesController {
  constructor(private readonly receiveAddressesService: ReceiveAddressesService) {}

  @Post()
  create(@Body() createReceiveAddressDto: CreateReceiveAddressDto) {
    return this.receiveAddressesService.create(createReceiveAddressDto);
  }

  @Get()
  findAll() {
    return this.receiveAddressesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receiveAddressesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReceiveAddressDto: UpdateReceiveAddressDto) {
    return this.receiveAddressesService.update(+id, updateReceiveAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receiveAddressesService.remove(+id);
  }
}
