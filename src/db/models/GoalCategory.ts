import {
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
    CreationOptional,
    DataTypes,
    HasManyAddAssociationMixin,
    HasManyAddAssociationsMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyHasAssociationMixin,
    HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin,
    HasManyRemoveAssociationsMixin,
    HasManySetAssociationsMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from 'sequelize';
import {sequelize} from '../sequelize';
import {Goal} from './Goal';

export class GoalCategory extends Model<InferAttributes<GoalCategory>,
    InferCreationAttributes<GoalCategory>> {
    declare id: CreationOptional<number>;
    declare title: string;

    declare goals?: NonAttribute<Goal[]>;
    declare addGoals: HasManyAddAssociationsMixin<Goal, Goal['id']>;
    declare setGoals: HasManySetAssociationsMixin<Goal, Goal['id']>;
    declare hasGoals: HasManyHasAssociationsMixin<Goal, Goal['id']>;
    declare getGoals: HasManyGetAssociationsMixin<Goal>;
    declare removeGoals: HasManyRemoveAssociationsMixin<Goal,
        Goal['id']>;
    declare countGoals: HasManyCountAssociationsMixin;
    declare createGoal: HasManyCreateAssociationMixin<Goal, 'id'>;
    declare addGoal: HasManyAddAssociationMixin<Goal, Goal['id']>;
    declare hasGoal: HasManyHasAssociationMixin<Goal, Goal['id']>;
    declare removeGoal: HasManyRemoveAssociationMixin<Goal, Goal['id']>;

    declare addGoalCategories: BelongsToManyAddAssociationsMixin<GoalCategory, GoalCategory['id']>;
    declare setGoalCategories: BelongsToManySetAssociationsMixin<GoalCategory, GoalCategory['id']>;
    declare hasGoalCategories: BelongsToManyHasAssociationsMixin<GoalCategory, GoalCategory['id']>;
    declare getGoalCategories: BelongsToManyGetAssociationsMixin<GoalCategory>;
    declare removeGoalCategories: BelongsToManyRemoveAssociationsMixin<GoalCategory, GoalCategory['id']>;
    declare countGoalCategories: BelongsToManyCountAssociationsMixin;
    declare createGoalCategory: BelongsToManyCreateAssociationMixin<GoalCategory>;
    declare addGoalCategory: BelongsToManyAddAssociationMixin<GoalCategory, GoalCategory['id']>;
    declare hasGoalCategory: BelongsToManyHasAssociationMixin<GoalCategory, GoalCategory['id']>;
    declare removeGoalCategory: BelongsToManyRemoveAssociationMixin<GoalCategory, GoalCategory['id']>;
}

GoalCategory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {sequelize, timestamps: true}
);
