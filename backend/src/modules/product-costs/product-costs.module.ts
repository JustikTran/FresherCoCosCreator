import { Module } from '@nestjs/common';
import { ProductCostsService } from './product-costs.service';
import { ProductCostsController } from './product-costs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductCost, ProductCostSchema } from './schemas/product-cost.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProductCost.name, schema: ProductCostSchema }])
  ],
  controllers: [ProductCostsController],
  providers: [ProductCostsService],
  exports: [ProductCostsService]
})
export class ProductCostsModule { }
