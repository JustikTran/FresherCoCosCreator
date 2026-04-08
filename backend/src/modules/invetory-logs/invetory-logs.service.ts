import { Injectable } from '@nestjs/common';
import { CreateInvetoryLogDto } from './dto/create-invetory-log.dto';
import { UpdateInvetoryLogDto } from './dto/update-invetory-log.dto';

@Injectable()
export class InvetoryLogsService {
  create(createInvetoryLogDto: CreateInvetoryLogDto) {
    return 'This action adds a new invetoryLog';
  }

  findAll() {
    return `This action returns all invetoryLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invetoryLog`;
  }

  update(id: number, updateInvetoryLogDto: UpdateInvetoryLogDto) {
    return `This action updates a #${id} invetoryLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} invetoryLog`;
  }
}
