import {
    BelongsToManyAddAssociationsMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyHasAssociationsMixin,
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
import {History} from "./History";


export type CrawlerMetaDataType = {}

export class Crawler extends Model<InferAttributes<Crawler>,
    InferCreationAttributes<Crawler>> {
    declare id?: CreationOptional<number> | null;
    declare name: string;
    declare metadata: CrawlerMetaDataType;
    declare histories: NonAttribute<History[]>;
    declare addHistories: BelongsToManyAddAssociationsMixin<History, History['id']>;
    declare setHistories: BelongsToManySetAssociationsMixin<History, History['id']>;
    declare hasHistory: BelongsToManyHasAssociationsMixin<History, History['id']>;
    declare getHistory: BelongsToManyGetAssociationsMixin<History>;
    declare removeHistory: BelongsToManyRemoveAssociationsMixin<History,
        History['id']>;

    // Crawler's histories
    // declare histories?: NonAttribute<History[]>;
    // declare addHistories: BelongsToManyAddAssociationsMixin<History, History['id']>;
    // declare setHistories: BelongsToManySetAssociationsMixin<History, History['id']>;
    // declare hasHistory: BelongsToManyHasAssociationsMixin<History, History['id']>;
    // declare getHistory: BelongsToManyGetAssociationsMixin<History>;
    // declare removeHistory: BelongsToManyRemoveAssociationsMixin<History,
    //     History['id']>;


}

Crawler.init(
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
        metadata: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: []
        },

    },
    {sequelize, timestamps: true}
);
