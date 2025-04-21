import { IMealsRepository } from "../../repositories/meals-repository";
import { MealNotFoundError } from "../errors/meal-not-found-error";


export class DeleteMealUseCase {

  constructor(
    private mealsRepository: IMealsRepository// Replace with actual repository type
  ) { }

  async execute(idMeal: string): Promise<void> {

    const mealExists = await this.mealsRepository.findById(idMeal)

    if (!mealExists) {
      throw new MealNotFoundError()
    }

    await this.mealsRepository.delete(idMeal)
    return
  }

}