import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create.dto';
import { Product } from './schemas/product.schema';
import { Request } from 'express';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private service: ProductService) {}

  @Post('/create')
  async add(@Body() dto: CreateProductDto) {
    console.log(dto);
    return await this.service.create(dto);
  }

  @Get('all')
  async findAll(): Promise<Product[]> {
    return this.service.findAll();
  }

  @Get('searchName')
  async searchName(@Req() req: Request) {
    let options = {};
    console.log(req.query.name);

    if (req.query.name) {
      options = {
        $or: [{ name: new RegExp(req.query.name.toString(), 'i') }],
      };
    }

    const data = this.service.find(options);

    return data;
  }

  @Get('searchDescription')
  async searchDescription(@Req() req: Request) {
    let options = {};
    console.log(req.query.description);

    if (req.query.description) {
      options = {
        $or: [
          { description: new RegExp(req.query.description.toString(), 'i') },
        ],
      };
    }

    const data = this.service.find(options);

    return data;
  }

  @Get('searchType')
  async searchType(@Req() req: Request) {
    let options = {};
    console.log(req.query.type);

    if (req.query.type) {
      options = {
        $or: [{ type: new RegExp(req.query.type.toString(), 'i') }],
      };
    }

    const data = this.service.find(options);

    return data;
  }

  @Get('searchOrigin')
  async searchOrigin(@Req() req: Request) {
    let options = {};
    console.log(req.query.origin);

    if (req.query.origin) {
      options = {
        $or: [{ origin: new RegExp(req.query.origin.toString(), 'i') }],
      };
    }

    const data = this.service.find(options);

    return data;
  }

  @Put('/update/:id')
  async update(@Param('id') id: string, @Body() body) {
    return this.service.update(id, body);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }

  @Get('/findOneProduct/:id')
  async findOneProduct(@Param('id') id: string) {
    return this.service.findOneProduct(id);
  }
}
