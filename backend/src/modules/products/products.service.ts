import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import mongoose, { Connection, Model } from 'mongoose';
import { Queries } from 'src/utils/CQRS/query';
import { ProductOptionsService } from '../product-options/product-options.service';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectConnection() private connection: Connection,
    private optionService: ProductOptionsService
  ) { }

  async create(createProductDto: CreateProductDto): Promise<{ id: mongoose.Types.ObjectId }> {
    const { name, thumbnail, price, description, brand, isOutStock } = createProductDto;

    const session = await this.connection.startSession();
    session.startTransaction();

    const newProduct = await this.productModel.create({ name, thumbnail, price, description, brand, isOutStock });
    for (const option of createProductDto.options) {
      option.productId = newProduct._id;
    }
    

    await this.optionService.create(createProductDto.options);

    session.commitTransaction();
    return { id: newProduct._id };
  }

  async findAll(query: any, current: string = '1', pageSize: string = '10'): Promise<{ meta: any, data: Product[] }> {
    return await Queries(this.productModel, query, +current, +pageSize);
  }

  async findOne(id: mongoose.Types.ObjectId): Promise<Product> {
    const product = await this.productModel.findById({ _id: id });
    if (!product) {
      throw new NotFoundException('Product can not be found.');
    }
    return product;
  }

  async update(id: mongoose.Types.ObjectId, updateProductDto: UpdateProductDto) {
    const productUpdate = await this.productModel.findByIdAndUpdate(id, { ...updateProductDto }, { new: true });
    return {
      id: productUpdate?._id
    };
  }

  async remove(id: mongoose.Types.ObjectId): Promise<string | object> {
    const productDeleted = await this.productModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
    return {
      id: productDeleted?._id
    };
  }
}
