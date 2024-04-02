import {InferCreationAttributes} from "sequelize";
import {User} from "../db/models/User";

export type UserDto = {
    id?: number;
    name: string;
    // posts: PostDto[],
    // goals: GoalDto[],

};

export type UserCreationDto = Omit<InferCreationAttributes<UserDto>, 'id'>;
