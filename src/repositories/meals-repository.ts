import { Meal, Prisma } from "@prisma/client";

export interface IMealsRepository{
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
}