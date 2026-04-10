import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from "mongoose";
import { ExpenseType } from 'src/utils/enum';

export type RevenueDocument = HydratedDocument<Revenue>;

@Schema({ collection: 'revenues', timestamps: true })
export class Revenue {
    @Prop({ required: true })
    type!: ExpenseType;

    @Prop({ required: true })
    amount!: number;

    @Prop({ required: true })
    note!: string;
}

export const RevenueSchema = SchemaFactory.createForClass(Revenue);