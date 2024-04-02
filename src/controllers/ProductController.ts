import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ProductService } from '../services/ProductService';
import {
  ProductCreationDto,
  ProductDto,
  ProductsDto,
} from '../view/ProductDto';
import { QueryProducts } from '../services/ProductService';

export class ProductController {
  public static getAll: RequestHandler<
    ParamsDictionary,
    ProductsDto,
    void,
    QueryProducts
  > = async (req, res, next) => {
    try {
      const products = await ProductService.getAllBy(req.query);
      res.status(200).send(products);
    } catch (error) {
      next(error);
    }
  };

  public static add: RequestHandler<void, ProductDto, ProductCreationDto> =
    async (req, res, next) => {
      try {
        const { title, description, imageUrl, price, GoalCategoryId } = req.body;
        const newProduct = await ProductService.create({
          title: title.trim(),
          description: description.trim(),
          imageUrl,
          price,
          GoalCategoryId,
        });

        res.status(200).send(ProductService.modelToDto(newProduct));
      } catch (error) {
        next(error);
      }
    };
}
