
import { beforeEach, describe, expect, it } from "vitest";
import { IMealsRepository } from "../../repositories/meals-repository";
import { CreateMealUseCase } from "./create-meal";
import { InMemoryMealsRepository } from "../../repositories/in-memory/in-memory-meals-repository";
import { UpdateMealUseCase } from "./update-meal";
import { object } from "zod";
import { MealNotFoundError } from "../errors/meal-not-found-error";

let mealRepository: InMemoryMealsRepository
let createMealUseCase: CreateMealUseCase
let updateMealUseCase: UpdateMealUseCase

describe('Update Meal Use Case', () => {

  beforeEach(() => {
    mealRepository = new InMemoryMealsRepository()
    createMealUseCase = new CreateMealUseCase(mealRepository)
    updateMealUseCase = new UpdateMealUseCase(mealRepository)
  })

  it('should be able to update a meal', async () => {
    const { meal } = await createMealUseCase.execute({
      name: 'xtudo',
      description: 'lanche',
      isOnDiet: false,
      mealDateTime: new Date(),
      userId: 'user-01'
    })

    const { meal: updatedMeal } = await updateMealUseCase.execute({
      name: 'xsalada',
    }, meal.id)

    expect(updatedMeal).toEqual(expect.objectContaining({
      name: 'xsalada',
    }))

    expect(updatedMeal).toEqual(expect.objectContaining({
      id: meal.id,
    }))
  })

  it('should not be able to update a meal that does not exist', async () => {
    await expect(() => updateMealUseCase.execute({
      name: 'xsalada',
    }, 'meal-01')).rejects.toBeInstanceOf(MealNotFoundError)
  })

})