import mongoose from "mongoose";
import { InventoryType } from "src/utils/enum";

export class CreateInventoryDto {
    productId!: mongoose.Types.ObjectId;
    optionId!: mongoose.Types.ObjectId;
    type!: InventoryType;
    quantity!: number;
    reason!: string;
}
