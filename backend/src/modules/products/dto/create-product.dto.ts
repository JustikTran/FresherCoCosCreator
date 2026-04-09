import { CreateProductOptionDto } from "src/modules/product-options/dto/create-product-option.dto";

export class CreateProductDto {
    name;
    thumbnail;
    price;
    description;
    brand;
    isOutStock;
    options!: CreateProductOptionDto[];
}
