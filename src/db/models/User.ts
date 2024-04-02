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
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from 'sequelize';
import {sequelize} from '../sequelize';
import {Post} from "./Post";
import {Goal} from "./Goal";
import {History} from "./History";


export class User extends Model<InferAttributes<User>,
    InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare name: string;

    // user's posts
    declare posts?: NonAttribute<Post[]>;
    // user's goals
    declare goals?: NonAttribute<Goal[]>;
    // user's histories
    declare histories?: NonAttribute<History[]>;

    declare getHistories: BelongsToManyGetAssociationsMixin<Goal>;
    declare addPosts: BelongsToManyAddAssociationsMixin<Post, Post['id']>;
    declare setPosts: BelongsToManySetAssociationsMixin<Post, Post['id']>;
    declare hasPosts: BelongsToManyHasAssociationsMixin<Post, Post['id']>;
    declare getPosts: BelongsToManyGetAssociationsMixin<Post>;
    declare removePosts: BelongsToManyRemoveAssociationsMixin<Post,
        Post['id']>;
    declare countPosts: BelongsToManyCountAssociationsMixin;
    declare createPost: BelongsToManyCreateAssociationMixin<Post>;
    declare addPost: BelongsToManyAddAssociationMixin<Post, Post['id']>;
    declare hasPost: BelongsToManyHasAssociationMixin<Post, Post['id']>;
    declare removePost: BelongsToManyRemoveAssociationMixin<Post, Post['id']>;
    declare addGoals: BelongsToManyAddAssociationsMixin<Goal, Goal['id']>;
    declare setGoals: BelongsToManySetAssociationsMixin<Goal, Goal['id']>;
    declare hasGoals: BelongsToManyHasAssociationsMixin<Goal, Goal['id']>;
    declare getGoals: BelongsToManyGetAssociationsMixin<Goal>;
    declare removeGoals: BelongsToManyRemoveAssociationsMixin<Goal, Goal['id']>;
    declare countGoals: BelongsToManyCountAssociationsMixin;
    declare createGoal: BelongsToManyCreateAssociationMixin<Goal>;
    declare addGoal: BelongsToManyAddAssociationMixin<Goal, Goal['id']>;
    declare hasGoal: BelongsToManyHasAssociationMixin<Goal, Goal['id']>;
    declare removeGoal: BelongsToManyRemoveAssociationMixin<Goal, Goal['id']>;
}

User.init(
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

    },
    {sequelize, timestamps: true}
);
