import { RequestHandler } from 'express';
import { OrderCreationDto, OrderDto } from '../view/OrderDto';
import { OrderService } from '../services/OrderService';

export class OrderController {
  public static add: RequestHandler<void, OrderDto, OrderCreationDto> = async (
    req,
    res,
    next
  ) => {
    try {
      const { name, adress, phone, productIds } = req.body;

      const newOrder = await OrderService.create({
        name: name.trim(),
        adress,
        phone,
        productIds,
      });

      res.status(200).send(newOrder);
    } catch (error) {
      next(error);
    }
  };
}
