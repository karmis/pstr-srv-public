import {
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize';
import { sequelize } from '../sequelize';
import { GoalCategory } from './GoalCategory';
import { Order } from './Order';

export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  declare id: CreationOptional<number>;
  declare imageUrl: string;
  declare title: string;
  declare description: string;
  declare price: number;

  declare GoalCategoryId: ForeignKey<GoalCategory['id'] | null>;
  declare GoalCategory?: NonAttribute<GoalCategory>;
  declare createGoalCategory: BelongsToCreateAssociationMixin<GoalCategory>;
  declare setGoalCategory: BelongsToSetAssociationMixin<GoalCategory, GoalCategory['id']>;
  declare getGoalCategory: BelongsToGetAssociationMixin<GoalCategory>;

  declare Orders?: NonAttribute<Order[]>;
  declare addOrders: BelongsToManyAddAssociationsMixin<Order, Order['id']>;
  declare setOrders: BelongsToManySetAssociationsMixin<Order, Order['id']>;
  declare hasOrders: BelongsToManyHasAssociationsMixin<Order, Order['id']>;
  declare getOrders: BelongsToManyGetAssociationsMixin<Order>;
  declare removeOrders: BelongsToManyRemoveAssociationsMixin<
    Order,
    Order['id']
  >;
  declare countOrders: BelongsToManyCountAssociationsMixin;
  declare createOrder: BelongsToManyCreateAssociationMixin<Order>;
  declare addOrder: BelongsToManyAddAssociationMixin<Order, Order['id']>;
  declare hasOrder: BelongsToManyHasAssociationMixin<Order, Order['id']>;
  declare removeOrder: BelongsToManyRemoveAssociationMixin<Order, Order['id']>;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { sequelize, timestamps: false }
);
