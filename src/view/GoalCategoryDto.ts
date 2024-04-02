export type GoalCategoryDto = {
  id: number;
  title: string;
};

export type GoalCategoryCreationDto = Omit<GoalCategoryDto, 'id'>;
