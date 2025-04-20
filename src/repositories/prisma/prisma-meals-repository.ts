import { Prisma, Meal } from "@prisma/client";
import { IMealsRepository } from "../meals-repository";
import { prisma } from "../../lib/prisma";

export class PrismaMealsRepository implements IMealsRepository {
  async create(data: Prisma.MealUncheckedCreateInput) {
    const meal = await prisma.meal.create({
      data
    })

    return meal
  }

  async update(data: Prisma.MealUncheckedUpdateInput, idMeal: string) {
    const meal = await prisma.meal.update({
      where: {
        id: idMeal
      },
      data
    })

    return meal
  }

}