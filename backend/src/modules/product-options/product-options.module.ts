import { Module } from '@nestjs/common';
import { ProductOptionsService } from './product-options.service';
import { ProductOptionsController } from './product-options.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OptionSchema, ProductOption } from './schemas/product-option.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProductOption.name, schema: OptionSchema }])
  ],
  controllers: [ProductOptionsController],
  providers: [ProductOptionsService],
  exports: [ProductOptionsService]
})
export class ProductOptionsModule { }
