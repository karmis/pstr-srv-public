import {Post} from '../db/models/Post';
import {PostDto} from '../view/PostDto';
import {GoalCreationDto, GoalDto} from "../view/GoalDto";
import {Goal} from "../db/models/Goal";
import {GoalCategoryCreationDto, GoalCategoryDto} from "../view/GoalCategoryDto";
import {GoalCategory} from "../db/models/GoalCategory";

export class GoalCategoryService {
    // public static async getAll(): Promise<PostDto[]> {
    //     const posts = await Post.findAll();
    //     return posts.map(PostService.modelToDto);
    // }

    public static modelToDto(goal: Goal): GoalCategoryDto {
        const {id, title} = goal;
        return {title, id};
    }

    public static async create(dto: GoalCategoryCreationDto): Promise<GoalCategory> {
        return await GoalCategory.create(dto);
    }
}
