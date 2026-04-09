import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type ProductCostDocument = HydratedDocument<ProductCost>;

@Schema({ collection: 'product-costs', timestamps: true })
export class ProductCost {
    @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Product' })
    productId!: mongoose.Types.ObjectId;

    @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'ProductOption' })
    optionId!: mongoose.Types.ObjectId;

    @Prop({ required: true })
    importPrice!: number;

    @Prop({ required: true })
    importDate!: Date;
}

export const ProductCostSchema = SchemaFactory.createForClass(ProductCost);