import { Order } from '../db/models/Order';
import { OrderCreationDto, OrderDto } from '../view/OrderDto';
import { ProductService } from './ProductService';

export class OrderService {
  public static async create(dto: OrderCreationDto): Promise<OrderDto> {
    const { name, adress, phone, productIds } = dto;
    const newOrder = await Order.create({
      name,
      adress,
      phone,
    });

    await newOrder.setProducts(productIds);
    return this.modelToDto(newOrder);
  }

  public static async modelToDto(order: Order): Promise<OrderDto> {
    const { id, name, adress, phone, status } = order;
    const Products = order.Products ?? (await order.getProducts());
    return {
      id,
      name,
      adress,
      phone,
      status,
      products: Products.map(ProductService.modelToDto),
    };
  }
}
