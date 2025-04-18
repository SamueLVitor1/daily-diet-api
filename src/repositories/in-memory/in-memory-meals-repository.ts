import { Prisma, Meal } from "@prisma/client";
import { IMealsRepository } from "../meals-repository";
import { randomUUID } from "node:crypto";

export class InMemoryMealsRepository implements IMealsRepository {
  public items: Meal[] = []

  async create(data: Prisma.MealUncheckedCreateInput) {
    const meal = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      meal_datetime: new Date(data.meal_datetime),
      is_on_diet: data.is_on_diet,
      created_at: new Date(),
      user_id: data.user_id
    }

    this.items.push(meal)

    return meal
  }

}