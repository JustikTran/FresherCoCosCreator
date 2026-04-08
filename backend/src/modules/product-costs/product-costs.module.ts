import { Module } from '@nestjs/common';
import { ProductCostsService } from './product-costs.service';
import { ProductCostsController } from './product-costs.controller';

@Module({
  controllers: [ProductCostsController],
  providers: [ProductCostsService],
})
export class ProductCostsModule {}
