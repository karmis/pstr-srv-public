import {
    BelongsToCreateAssociationMixin,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from 'sequelize';
import {sequelize} from '../sequelize';
import {Post} from './Post';
import {Crawler} from './Crawler';
import {Goal} from "./Goal";
import {User} from "./User";

export enum HistoryStatus {
    new = 'new',
    pending = 'pending',
    posted = 'posted',
    deleted = 'deleted',
    blocked = 'blocked',
    error = 'error',
}

export class History extends Model<InferAttributes<History>,
    InferCreationAttributes<History>> {
    declare id?: CreationOptional<number> | null;
    declare status: HistoryStatus;
    declare url: string;

    declare goalId: ForeignKey<Goal['id'] | null>;
    declare goal?: NonAttribute<Goal>;
    declare createGoal: BelongsToCreateAssociationMixin<Goal>;
    declare setGoal: BelongsToSetAssociationMixin<Goal, Goal['id']>;
    declare getGoal: BelongsToGetAssociationMixin<Goal>;

    declare postId: ForeignKey<Post['id'] | null>;
    declare post?: NonAttribute<Post>;
    declare createPost: BelongsToCreateAssociationMixin<Post>;
    declare setPost: BelongsToSetAssociationMixin<Post, Post['id']>;
    declare getPost: BelongsToGetAssociationMixin<Post>;

    declare crawlerId: ForeignKey<Crawler['id'] | null>;
    declare crawler?: NonAttribute<Crawler>;
    declare createCrawler: BelongsToCreateAssociationMixin<Crawler>;
    declare setCrawler: BelongsToSetAssociationMixin<Crawler, Crawler['id']>;
    declare getCrawler: BelongsToGetAssociationMixin<Crawler>;

    declare userId: ForeignKey<User['id'] | null>;
    declare user?: NonAttribute<User>;
    declare createUser: BelongsToCreateAssociationMixin<User>;
    declare setUser: BelongsToSetAssociationMixin<User, User['id']>;
    declare getUser: BelongsToGetAssociationMixin<User>;
}

History.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {sequelize, timestamps: true}
);
