import { beforeEach, describe, expect, it } from "vitest";
import { IMealsRepository } from "../../repositories/meals-repository";
import { CreateMealUseCase } from "./create-meal";
import { InMemoryMealsRepository } from "../../repositories/in-memory/in-memory-meals-repository";

let mealRepository: IMealsRepository
let createMealUseCase: CreateMealUseCase

describe('Create Meal Use Case', () => {

  beforeEach(() => {
    mealRepository = new InMemoryMealsRepository()
    createMealUseCase = new CreateMealUseCase(mealRepository)
  })

  it('should be able to create a new meal', async () => {
    const { meal } = await createMealUseCase.execute({
      name: 'xtudo',
      description: 'lanche',
      isOnDiet: false,
      mealDatetime: new Date(),
      userId: 'user-01'
    })

    expect(meal.id).toEqual(expect.any(String))
  })

})