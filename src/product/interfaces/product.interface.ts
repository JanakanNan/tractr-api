import { Document } from 'mongoose';

export interface Product extends Document {
  name: string;
  price: number;
  weight: string;
  origin: string;
  barcode: string;
  description: string;
  type: string;
  dimension: string;
  taxe: string;
}
