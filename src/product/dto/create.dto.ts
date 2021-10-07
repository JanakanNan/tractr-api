import { ApiProperty} from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @ApiProperty()
  weight: string;

  @ApiProperty()
  origin: string;

  @ApiProperty()
  barcode: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  dimension: string;

  @IsNotEmpty()
  @ApiProperty()
  taxe: string;
}
