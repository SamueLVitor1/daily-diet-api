import { beforeEach, describe, expect, it } from "vitest";
import { CreateMealUseCase } from "./create-meal";
import { InMemoryMealsRepository } from "../../repositories/in-memory/in-memory-meals-repository";
import { CountMealsOffDietUseCase } from "./count-meals-off-diet";

let mealRepository: InMemoryMealsRepository
let countMealsOffDietUseCase: CountMealsOffDietUseCase

describe('Count Meal Off Diet Use Case', () => {

  beforeEach(() => {
    mealRepository = new InMemoryMealsRepository()
    countMealsOffDietUseCase = new CountMealsOffDietUseCase(mealRepository)
  })

  it("should be able to count the user's meals that are off diet", async () => {

    mealRepository.items.push({
      id: `meal-1`,
      name: `Meal 1`,
      description: `Description 1`,
      meal_datetime: new Date(),
      is_on_diet: false,
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



    const { count } = await countMealsOffDietUseCase.execute('user-01')

    expect(count).toEqual(2)
  })
})