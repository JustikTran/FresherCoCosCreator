import { Module } from '@nestjs/common';
import { ReceiveAddressesService } from './receive-addresses.service';
import { ReceiveAddressesController } from './receive-addresses.controller';

@Module({
  controllers: [ReceiveAddressesController],
  providers: [ReceiveAddressesService],
})
export class ReceiveAddressesModule {}
