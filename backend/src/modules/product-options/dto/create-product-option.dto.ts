import { CreateProductCostDto } from "src/modules/product-costs/dto/create-product-cost.dto"

export class CreateProductOptionDto {
    productId
    size
    color
    price
    quantity
    image
    cost?: CreateProductCostDto
}
