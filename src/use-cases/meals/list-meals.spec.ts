import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryMealsRepository } from "../../repositories/in-memory/in-memory-meals-repository";
import { ListMealsUseCase } from "./list-meals";
import { exec } from "child_process";

let mealRepository: InMemoryMealsRepository
let listMealsUseCase: ListMealsUseCase

describe('List Meal Use Case', () => {

  beforeEach(() => {
    mealRepository = new InMemoryMealsRepository()
    listMealsUseCase = new ListMealsUseCase(mealRepository)
  })

  it('should be able to list meals for a user', async () => {

    for (let index = 0; index < 5; index++) {
      mealRepository.items.push({
        id: `meal-${index + 1}`,
        name: `Meal ${index + 1}`,
        description: `Description for meal ${index + 1}`,
        meal_datetime: new Date(),
        is_on_diet: index % 2 === 0,
        created_at: new Date(),
        user_id: 'user-01'
      })
    }


    const { meals } = await listMealsUseCase.execute({
      userId: 'user-01'
    })

    expect(meals).toEqual(expect.arrayContaining([
      expect.objectContaining({
        user_id: 'user-01'
      })
    ]))

    expect(meals).toHaveLength(5)
  })
  
  it('should return null if no meals are found for the user', async () => {

    const { meals } = await listMealsUseCase.execute({
      userId: 'user-02'
    })

    expect(meals).toBeNull()
  })
})