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

  async delete(idMeal: string) {
    await prisma.meal.delete({
      where: {
        id: idMeal
      }
    })

    return
  }

  async findById(idMeal: string) {
    const meal = await prisma.meal.findUnique({
      include: {
        user: {
          select: {
            name: true
          }
        }
      },
      where: {
        id: idMeal
      }
    })

    return meal
  }

  async findAllByUserId(userId: string) {
    const meals = await prisma.meal.findMany({
      where: {
        user_id: userId
      },
      orderBy: {
        meal_datetime: 'desc'
      }
    })

    if (meals.length === 0) {
      return null
    }

    return meals
  }
}