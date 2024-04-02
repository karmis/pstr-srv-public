import {
    BelongsToCreateAssociationMixin,
    BelongsToGetAssociationMixin,
    BelongsToManyAddAssociationsMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyHasAssociationsMixin,
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
import {sequelize} from '../sequelize';
import {History} from './History';
import {User} from "./User";

export type PostMetaDataType = {
    title?: string,
    content?: string,
    images?: string[],
}


// export type PostStatus = 'new' | 'drafted' | 'pending' | 'posting' | 'pub_awaiting' | 'posted' | 'deleted' | 'blocked';

export class Post extends Model<InferAttributes<Post>,
    InferCreationAttributes<Post>> {
    declare id: CreationOptional<number>;
    declare metadata: PostMetaDataType;
    declare userId: ForeignKey<User['id'] | null>;


    declare createUser: BelongsToCreateAssociationMixin<User>;
    declare setUser: BelongsToSetAssociationMixin<User, User['id']>;
    declare getUser: BelongsToGetAssociationMixin<User>;
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        metadata: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: []
        },
    },
    {sequelize, timestamps: true}
);
