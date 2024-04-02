import {Post, PostMetaDataType} from "../db/models/Post";
import {HistoriesDto} from "./HistoryDto";
import {InferCreationAttributes} from "sequelize";

export type PostDto = {
    id?: number;
    metadata: PostMetaDataType;
    // histories: HistoriesDto[]
    userId: number | null;
};

export type PostsDto = {
    posts: PostDto[];
    histories: HistoriesDto[],
    // totalCount: number;
};

export type PostCreationDto = Omit<InferCreationAttributes<PostDto>, 'id'>;
