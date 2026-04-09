import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

@Schema({ collection: 'products', timestamps: true })
export class Product {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    thumbnail!: string;

    @Prop({ required: true })
    price!: number;

    @Prop({ required: true })
    description!: string;

    @Prop({ required: true })
    brand!: string;

    @Prop({ required: true, default: true })
    isOutStock!: boolean;

    @Prop()
    deletedAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);