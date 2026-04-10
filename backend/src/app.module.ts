import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthsModule } from 'src/modules/auths/auths.module';
import { UsersModule } from 'src/modules/users/users.module';
import { ProductsModule } from 'src/modules/products/products.module';
import { ProductOptionsModule } from 'src/modules/product-options/product-options.module';
import { ProductCostsModule } from 'src/modules/product-costs/product-costs.module';
import { InventoriesModule } from './modules/inventories/inventories.module';
import { RevenuesModule } from './modules/revenues/revenues.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DB_URL!),
    AuthsModule,
    UsersModule,
    ProductsModule,
    ProductOptionsModule,
    ProductCostsModule,
    InventoriesModule, 
    RevenuesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
