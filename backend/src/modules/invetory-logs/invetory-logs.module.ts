import { Module } from '@nestjs/common';
import { InvetoryLogsService } from './invetory-logs.service';
import { InvetoryLogsController } from './invetory-logs.controller';

@Module({
  controllers: [InvetoryLogsController],
  providers: [InvetoryLogsService],
})
export class InvetoryLogsModule {}
