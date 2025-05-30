import { UUID } from "crypto";
import { IMealsRepository } from "../../repositories/meals-repository";
import { MealNotFoundError } from "../errors/meal-not-found-error";
import { UnauthorizedAccessError } from "../errors/unauthorized-access-error";

interface DeleteMealUseCaseRequest {
  idMeal: string;
  userId: string
}

interface DeleteMealUseCaseResponse {
  message: string
}

export class DeleteMealUseCase {

  constructor(
    private mealsRepository: IMealsRepository// Replace with actual repository type
  ) { }

  async execute({ idMeal, userId }: DeleteMealUseCaseRequest): Promise<DeleteMealUseCaseResponse> {

    const mealExists = await this.mealsRepository.findById(idMeal)

    if (mealExists?.user_id !== userId) {
      throw new UnauthorizedAccessError()
    }

    if (!mealExists) {
      throw new MealNotFoundError()
    }

    await this.mealsRepository.delete(idMeal)
    return {
      message: 'Meal deleted successfully'
    }
  }

}