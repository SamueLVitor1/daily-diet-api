import { Meal, Prisma } from "@prisma/client";

export interface IMealsRepository {
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  update(data: Prisma.MealUncheckedUpdateInput, idMeal: string): Promise<Meal>
  findById(idMeal: string): Promise<Meal | null>
  delete(idMeal: string): Promise<void>
  findAllByUserId(userId: string): Promise<Meal[] | null>
  countMealsByUserId(userId: string): Promise<number>
  countMealsOnDietByUser(userId: string): Promise<number>
}