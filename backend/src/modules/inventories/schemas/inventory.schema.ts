import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { InventoryType } from "src/utils/enum";

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema({ collection: 'inventory-logs', timestamps: true })
export class Inventory {
    @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Product' })
    productId!: mongoose.Types.ObjectId;

    @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'ProductOption' })
    optionId!: mongoose.Types.ObjectId;

    @Prop({ required: true, enum: InventoryType })
    type!: InventoryType;

    @Prop({ required: true })
    quantity!: number;

    @Prop({ required: true })
    reason!: string;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);