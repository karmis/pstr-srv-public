import {GoalCreationDto, GoalDto} from "../view/GoalDto";
import {Goal} from "../db/models/Goal";

export class GoalService {
    // public static async getAll(): Promise<PostDto[]> {
    //     const posts = await Post.findAll();
    //     return posts.map(PostService.modelToDto);
    // }

    public static modelToDto(goal: Goal): GoalDto {
        const {id, name, url, userId, goalCategoryId} = goal;
        return <GoalDto>{id, name, url, userId, goalCategoryId};
    }

    public static async create(dto: GoalCreationDto): Promise<Goal> {
        return await Goal.create(dto);
    }
}
