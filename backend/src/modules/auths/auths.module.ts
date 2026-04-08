import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from 'src/modules/auths/schemas/auth.schema';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    UsersModule
  ],
  controllers: [AuthsController],
  providers: [AuthsService],
})
export class AuthsModule { }
