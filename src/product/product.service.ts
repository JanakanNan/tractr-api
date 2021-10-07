import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument, Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private useModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.useModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.useModel.find().exec();
  }

  find(options) {
    return this.useModel.find(options);
  }

  count(options) {
    return this.useModel.count(options).exec();
  }

  async update(id, createProductDto: CreateProductDto): Promise<Product> {
    return await this.useModel.findByIdAndUpdate(id, createProductDto);
  }

  async delete(id) {
    return await this.useModel.findByIdAndRemove(id);
  }

  async findOne(query, projection = {}) {
    return this.useModel.find(query, projection);
  }
}
