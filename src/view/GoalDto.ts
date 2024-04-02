import {InferCreationAttributes} from "sequelize";
import {Goal} from "../db/models/Goal";

export type GoalDto = {
    id: number;
    name: string;
    url: string;
    userId: number | null;
    goalCategoryId: number | null;
};

// export type GoalsDto = {
//     goals: GoalDto[];
//     totalCount: number;
// };

export type GoalCreationDto = Omit<InferCreationAttributes<GoalDto>, 'id'>;
