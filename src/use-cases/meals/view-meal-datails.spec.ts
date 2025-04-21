

import { beforeEach, describe, expect, it } from "vitest";
import { IMealsRepository } from "../../repositories/meals-repository";
import { CreateMealUseCase } from "./create-meal";
import { InMemoryMealsRepository } from "../../repositories/in-memory/in-memory-meals-repository";
import { UpdateMealUseCase } from "./update-meal";
import { object } from "zod";
import { MealNotFoundError } from "../errors/meal-not-found-error";
import { ViewMealDetailsUseCase } from "./view-meal-datails";

let mealRepository: InMemoryMealsRepository
let createMealUseCase: CreateMealUseCase
let viewMealDetailsUseCase: ViewMealDetailsUseCase

describe('View Meal Details Use Case', () => {

  beforeEach(() => {
    mealRepository = new InMemoryMealsRepository()
    createMealUseCase = new CreateMealUseCase(mealRepository)
    viewMealDetailsUseCase = new ViewMealDetailsUseCase(mealRepository)
  })

  it('should be able to view meal details', async () => {
    const { meal } = await createMealUseCase.execute({
      name: 'xtudo',
      description: 'lanche',
      isOnDiet: false,
      mealDateTime: new Date(),
      userId: 'user-01'
    })

    const { meal: mealDetails } = await viewMealDetailsUseCase.execute({
      idMeal: meal.id
    },)

    expect(mealDetails).toEqual(expect.objectContaining({
      ...meal
    }))

  })

  it('should not be able to view meal details that does not exist', async () => {
    await expect(() => viewMealDetailsUseCase.execute({
      idMeal: 'inexistent-meal-id'
    })).rejects.toBeInstanceOf(MealNotFoundError)
  })

})