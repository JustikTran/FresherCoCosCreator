import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvetoryLogsService } from './invetory-logs.service';
import { CreateInvetoryLogDto } from './dto/create-invetory-log.dto';
import { UpdateInvetoryLogDto } from './dto/update-invetory-log.dto';

@Controller('invetory-logs')
export class InvetoryLogsController {
  constructor(private readonly invetoryLogsService: InvetoryLogsService) {}

  @Post()
  create(@Body() createInvetoryLogDto: CreateInvetoryLogDto) {
    return this.invetoryLogsService.create(createInvetoryLogDto);
  }

  @Get()
  findAll() {
    return this.invetoryLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invetoryLogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvetoryLogDto: UpdateInvetoryLogDto) {
    return this.invetoryLogsService.update(+id, updateInvetoryLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invetoryLogsService.remove(+id);
  }
}
