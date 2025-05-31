
import { beforeEach, describe, expect, it } from "vitest";
import { IMealsRepository } from "../../repositories/meals-repository";
import { CreateMealUseCase } from "./create-meal";
import { InMemoryMealsRepository } from "../../repositories/in-memory/in-memory-meals-repository";
import { UpdateMealUseCase } from "./update-meal";
import { object } from "zod";
import { MealNotFoundError } from "../errors/meal-not-found-error";
import { DeleteMealUseCase } from "./delete-meal";

let mealRepository: InMemoryMealsRepository
let createMealUseCase: CreateMealUseCase
let deleteMealUseCase: DeleteMealUseCase

describe('Delete Meal Use Case', async () => {

  beforeEach(() => {
    mealRepository = new InMemoryMealsRepository()
    createMealUseCase = new CreateMealUseCase(mealRepository)
    deleteMealUseCase = new DeleteMealUseCase(mealRepository)
  })

  it('should be able to delete a meal', async () => {
    const { meal } = await createMealUseCase.execute({
      name: 'xtudo',
      description: 'lanche',
      isOnDiet: false,
      mealDateTime: new Date(),
      userId: 'user-01'
    })

    const { meal: meal2 } = await createMealUseCase.execute({
      name: 'xtudo',
      description: 'lanche',
      isOnDiet: false,
      mealDateTime: new Date(),
      userId: 'user-01'
    })

    await deleteMealUseCase.execute({
      idMeal: meal.id,
      userId: 'user-01'
    })

    expect(mealRepository.items).toHaveLength(1)
  })

})