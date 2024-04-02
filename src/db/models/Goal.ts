import {
    BelongsToCreateAssociationMixin, BelongsToGetAssociationMixin, BelongsToSetAssociationMixin,
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from 'sequelize';
import {sequelize} from '../sequelize';
import {User} from "./User";
import {GoalCategory} from "./GoalCategory";


export class Goal extends Model<InferAttributes<Goal>,
    InferCreationAttributes<Goal>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare url: string;

    declare userId: ForeignKey<User['id'] | null>;
    declare user?: NonAttribute<User>;
    declare createUser: BelongsToCreateAssociationMixin<User>;
    declare setUser: BelongsToSetAssociationMixin<User, User['id']>;
    declare getUser: BelongsToGetAssociationMixin<User>;

    declare goalCategoryId: ForeignKey<GoalCategory['id'] | null>;
    declare goalCategory?: NonAttribute<GoalCategory>;
    declare createGoalCategory: BelongsToCreateAssociationMixin<GoalCategory>;
    declare setGoalCategory: BelongsToSetAssociationMixin<GoalCategory, GoalCategory['id']>;
    declare getGoalCategory: BelongsToGetAssociationMixin<GoalCategory>;
}

Goal.init(
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
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },
    {sequelize, timestamps: true}
);
