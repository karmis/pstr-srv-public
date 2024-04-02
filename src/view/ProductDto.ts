export type ProductDto = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  GoalCategoryId: number | null;
};

export type ProductsDto = {
  products: ProductDto[];
  totalCount: number;
};

export type ProductCreationDto = Omit<ProductDto, 'id'>;
