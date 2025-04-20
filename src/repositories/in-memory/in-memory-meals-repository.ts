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

  async update(data: Prisma.MealUncheckedUpdateInput, idMeal: string): Promise<Meal> {
    const mealIndex = this.items.findIndex(meal => meal.id === idMeal)
  
    if (mealIndex === -1) {
      throw new Error('Meal not found')
    }
  
    const currentMeal = this.items[mealIndex]
  
    const updatedMeal = {
      ...currentMeal,
      name: typeof data.name === 'string' ? data.name : currentMeal.name,
      description: typeof data.description === 'string' || data.description === null ? data.description : currentMeal.description,
      meal_datetime: typeof data.meal_datetime === 'string' || data.meal_datetime instanceof Date
        ? new Date(data.meal_datetime)
        : currentMeal.meal_datetime,
      is_on_diet: typeof data.is_on_diet === 'boolean' ? data.is_on_diet : currentMeal.is_on_diet,
      user_id: typeof data.user_id === 'string' ? data.user_id : currentMeal.user_id,
      created_at: currentMeal.created_at // geralmente não se atualiza isso
    }
  
    this.items[mealIndex] = updatedMeal
  
    return updatedMeal
  }

}