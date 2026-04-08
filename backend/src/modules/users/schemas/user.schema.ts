import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    phone!: string;

    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    avatar!: string;

    @Prop()
    deletedAt?: Date
}

export const UserSchema = SchemaFactory.createForClass(User);