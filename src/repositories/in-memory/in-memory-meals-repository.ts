import { Prisma, Meal } from "@prisma/client";
import { IMealsRepository } from "../meals-repository";
import { randomUUID } from "node:crypto";

export class InMemoryMealsRepository implements IMealsRepository {

  public items: Meal[] = []

  async create(data: Prisma.MealUncheckedCreateInput) {
    const meal = {
      id: randomUUID(),
      name: data.name,
      description: data.description ?? null,
      meal_datetime: new Date(data.meal_datetime),
      is_on_diet: data.is_on_diet,
      created_at: new Date(),
      user_id: data.user_id
    }

    this.items.push(meal)

    return meal
  }

  // async update(data: Prisma.MealUncheckedUpdateInput, idMeal: string) {

  //   const mealIndex = this.items.findIndex(meal => meal.id === idMeal)

  //   if (mealIndex === -1) {
  //     throw new Error('Meal not found')
  //   }

  //   const currentMeal = this.items[mealIndex]

  //   const updatedMeal = {
  //     ...currentMeal,
  //     ...data,
  //     meal_datetime:
  //       typeof data.meal_datetime === 'string' || data.meal_datetime instanceof Date
  //         ? new Date(data.meal_datetime)
  //         : currentMeal.meal_datetime,


  //   }
  //   this.items[mealIndex] = updatedMeal

  //   return updatedMeal
  // }

}