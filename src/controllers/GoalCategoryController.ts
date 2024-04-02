import { RequestHandler } from 'express';
import { GoalCategoryCreationDto, GoalCategoryDto } from '../view/GoalCategoryDto';
import { GoalCategoryService } from '../services/GoalCategoryService';

export class GoalCategoryController {
  public static add: RequestHandler<void, GoalCategoryCreationDto, GoalCategoryDto> =
    async (req, res, next) => {
      try {
        const { title } = req.body;
        const newGoalCategory = await GoalCategoryService.create({
          title: title.trim(),
        });
        res.status(200).send(newGoalCategory);
      } catch (error) {
        next(error);
      }
    };

  public static getAll: RequestHandler<void, GoalCategoryDto[]> = async (
    req,
    res
  ) => {
    const categories = await GoalCategoryService.getAll();
    // categories.map((cat) => console.log(cat.toJSON()));
    res.status(200).send(categories);
  };
}
