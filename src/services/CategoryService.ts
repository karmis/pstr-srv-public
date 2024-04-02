import {GoalCategory} from "../db/models/GoalCategory";

export class GoalCategoryService {
  public static async getAll(): Promise<GoalCategoryDto[]> {
    const categories = await GoalCategory.findAll();
    return categories.map(GoalCategoryService.modelToDto);
  }

  public static modelToDto(GoalCategory: GoalCategory): GoalCategoryDto {
    const { id, title } = GoalCategory;
    return { id, title };
  }
  public static async create(dto: GoalCategoryCreationDto): Promise<GoalCategory> {
    return await GoalCategory.create(dto);
    // return newGoalCategory
  }
}
