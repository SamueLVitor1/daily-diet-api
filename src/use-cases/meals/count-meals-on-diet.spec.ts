import { beforeEach, describe, expect, it } from "vitest";
import { CreateMealUseCase } from "./create-meal";
import { InMemoryMealsRepository } from "../../repositories/in-memory/in-memory-meals-repository";
import { Count } from "@prisma/client/runtime/library";
import { CountMealsUseCase } from "./count-meals";
import { CountMealsOnDietUseCase } from "./count-meals-on-diet";

let mealRepository: InMemoryMealsRepository
let countMealsOnDietUseCase: CountMealsOnDietUseCase

describe('Count Meal On Diet Use Case', () => {

  beforeEach(() => {
    mealRepository = new InMemoryMealsRepository()
    countMealsOnDietUseCase = new CountMealsOnDietUseCase(mealRepository)
  })

  it("should be able to get the meal count in a user's diet metrics", async () => {

    mealRepository.items.push({
      id: `meal-1`,
      name: `Meal 1`,
      description: `Description 1`,
      meal_datetime: new Date(),
      is_on_diet: true,
      created_at: new Date(),
      user_id: 'user-01'
    })

    mealRepository.items.push({
      id: `meal-2`,
      name: `Meal 2`,
      description: `Description 2`,
      meal_datetime: new Date(),
      is_on_diet: false,
      created_at: new Date(),
      user_id: 'user-01'
    })



    const { count } = await countMealsOnDietUseCase.execute('user-01')

    expect(count).toEqual(1)
  })
})