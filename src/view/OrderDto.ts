import { Status } from '../db/models/Order';
import { ProductDto } from './ProductDto';

export type OrderDto = {
  id: number;
  name: string;
  adress: string;
  phone: string;
  status: Status;
  products: ProductDto[];
};

export type OrderCreationDto = Omit<OrderDto, 'id' | 'status' | 'products'> & {
  productIds: number[];
};
