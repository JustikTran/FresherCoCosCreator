import { PartialType } from '@nestjs/mapped-types';
import { CreateProductCostDto } from './create-product-cost.dto';

export class UpdateProductCostDto extends PartialType(CreateProductCostDto) {}
