import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  BelongsToManyAddAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
  NonAttribute,
} from 'sequelize';
import { sequelize } from '../sequelize';
import { Product } from './Product';

export enum Status {
  cancelled = 'cancelled',
  pending = 'pending',
  fulfilled = 'fulfilled',
}

export class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare adress: string;
  declare phone: string;
  declare status: CreationOptional<Status>;

  declare Products?: NonAttribute<Product[]>;

  declare addProducts: BelongsToManyAddAssociationsMixin<
    Product,
    Product['id']
  >;
  declare setProducts: BelongsToManySetAssociationsMixin<
    Product,
    Product['id']
  >;
  declare hasProducts: BelongsToManyHasAssociationsMixin<
    Product,
    Product['id']
  >;
  declare getProducts: BelongsToManyGetAssociationsMixin<Product>;
  declare removeProducts: BelongsToManyRemoveAssociationsMixin<
    Product,
    Product['id']
  >;
  declare countProducts: BelongsToManyCountAssociationsMixin;
  declare createProduct: BelongsToManyCreateAssociationMixin<Product>;
  declare addProduct: BelongsToManyAddAssociationMixin<Product, Product['id']>;
  declare hasProduct: BelongsToManyHasAssociationMixin<Product, Product['id']>;
  declare removeProduct: BelongsToManyRemoveAssociationMixin<
    Product,
    Product['id']
  >;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(Status)),
      defaultValue: Status.pending,
    },
  },
  { sequelize, timestamps: false }
);
