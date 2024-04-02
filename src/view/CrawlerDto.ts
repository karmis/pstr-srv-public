import {InferCreationAttributes} from "sequelize";
import {Crawler, CrawlerMetaDataType} from "../db/models/Crawler";

export type CrawlerDto = {
    id?: number;
    name: string;
    metadata?: CrawlerMetaDataType;
};

export type CrawlerCreationDto = InferCreationAttributes<CrawlerDto>; // Omit<CrawlerDto, 'id'>;
