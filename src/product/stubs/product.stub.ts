import { Product } from '../schemas/product.schema';

export const ProductStub = (): Product => {
  return {
    name: 'test',
    price: 500,
    weight: '800',
    origin: 'france',
    barcode: '1587fd',
    description: 'produit de bonne qualité',
    type: 'technologie',
    dimension: '120*89*400',
    taxe: '20',
  };
};
