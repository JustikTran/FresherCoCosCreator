import { PartialType } from '@nestjs/mapped-types';
import { CreateReceiveAddressDto } from './create-receive-address.dto';

export class UpdateReceiveAddressDto extends PartialType(CreateReceiveAddressDto) {}
