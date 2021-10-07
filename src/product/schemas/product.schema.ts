import { Document} from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  weight: string;

  @Prop()
  origin: string;

  @Prop()
  barcode: string;

  @Prop()
  description: string;

  @Prop()
  type: string;

  @Prop()
  dimension: string;

  @Prop()
  taxe: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);