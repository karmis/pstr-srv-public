import {HistoryStatus} from "../db/models/History";
import {InferCreationAttributes} from "sequelize";

export type HistoryDto = {
    id?: number;
    status: string,
    goalId: number;
    postId: number;
    crawlerId: number,
    userId: number,
    url: string
};


export type HistoriesDto = {
    histories: HistoryDto[];
    totalCount: number;
};


export type HistoryCreationDto = Omit<InferCreationAttributes<HistoryDto>, 'id'>; // Omit<HistoryDto, 'id'>;

