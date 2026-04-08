import { Injectable } from '@nestjs/common';
import { CreateReceiveAddressDto } from './dto/create-receive-address.dto';
import { UpdateReceiveAddressDto } from './dto/update-receive-address.dto';

@Injectable()
export class ReceiveAddressesService {
  create(createReceiveAddressDto: CreateReceiveAddressDto) {
    return 'This action adds a new receiveAddress';
  }

  findAll() {
    return `This action returns all receiveAddresses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} receiveAddress`;
  }

  update(id: number, updateReceiveAddressDto: UpdateReceiveAddressDto) {
    return `This action updates a #${id} receiveAddress`;
  }

  remove(id: number) {
    return `This action removes a #${id} receiveAddress`;
  }
}
