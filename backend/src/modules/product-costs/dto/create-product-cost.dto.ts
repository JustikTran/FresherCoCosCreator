import mongoose from "mongoose"

export class CreateProductCostDto {
    productId?: mongoose.Types.ObjectId;
    optionId?: mongoose.Types.ObjectId;
    importPrice
    importDate
}
