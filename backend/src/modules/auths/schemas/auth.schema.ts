import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Role } from "src/utils/enum";

export type AuthDocument = HydratedDocument<Auth>;

@Schema({ collection: 'auths', timestamps: true })
export class Auth {
    @Prop({ required: true })
    password!: string;

    @Prop({ required: true, enum: Role })
    role!: Role;

    @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
    userId!: mongoose.Types.ObjectId;

    @Prop({ default: false })
    isBanned!: boolean;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);