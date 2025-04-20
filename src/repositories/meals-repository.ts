import { Meal, Prisma } from "@prisma/client";

export interface IMealsRepository {
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  // update(data: Prisma.MealUncheckedUpdateInput, idMeal: string): Promise<Meal>
}