import { Module } from '@nestjs/common';
import { RevenuesService } from './revenues.service';
import { RevenuesController } from './revenues.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Revenue, RevenueSchema } from './schemas/revenue.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Revenue.name, schema: RevenueSchema }])
  ],
  controllers: [RevenuesController],
  providers: [RevenuesService],
  exports: [RevenuesService]
})
export class RevenuesModule { }
