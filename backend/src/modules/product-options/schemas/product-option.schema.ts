import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type OptionDocument = HydratedDocument<ProductOption>;

@Schema({ collection: 'product-options', timestamps: true })
export class ProductOption {
    @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Product' })
    productId!: mongoose.Types.ObjectId;

    @Prop({ required: true })
    size!: string;

    @Prop({ required: true })
    color!: string;

    @Prop({ required: true })
    price!: number;

    @Prop({ required: true })
    quantity!: number;

    @Prop({ required: true })
    image!: string;

    @Prop()
    deletedAt?: Date;
}

export const OptionSchema = SchemaFactory.createForClass(ProductOption);