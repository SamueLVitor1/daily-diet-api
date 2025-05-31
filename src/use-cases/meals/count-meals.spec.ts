import { beforeEach, describe, expect, it } from "vitest";
import { CreateMealUseCase } from "./create-meal";
import { InMemoryMealsRepository } from "../../repositories/in-memory/in-memory-meals-repository";
import { Count } from "@prisma/client/runtime/library";
import { CountMealsUseCase } from "./count-meals";

let mealRepository: InMemoryMealsRepository
let countMealsUseCase: CountMealsUseCase

describe('Count Meal Use Case', () => {

  beforeEach(() => {
    mealRepository = new InMemoryMealsRepository()
    countMealsUseCase = new CountMealsUseCase(mealRepository)
  })

  it('should be able to get meal count metrics for a user', async () => {

    for (let index = 0; index < 5; index++) {
      mealRepository.items.push({
        id: `meal-${index}`,
        name: `Meal ${index}`,
        description: `Description ${index}`,
        meal_datetime: new Date(),
        is_on_diet: index % 2 === 0,
        created_at: new Date(),
        user_id: 'user-01'
      })

    }

    const { count } = await countMealsUseCase.execute('user-01')

    expect(count).toEqual(5)
  })
})