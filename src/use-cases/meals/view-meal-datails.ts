import { Meal } from "@prisma/client"
import { IMealsRepository } from "../../repositories/meals-repository"
import { MealNotFoundError } from "../errors/meal-not-found-error"

interface ViewMealDetailsUseCaseRequest {
  idMeal: string
}

interface ViewMealDetailsUseCaseResponse {
  meal: Meal
}

export class ViewMealDetailsUseCase {

  constructor(
    private mealsRepository: IMealsRepository,
  ) { }

  async execute({ idMeal }: ViewMealDetailsUseCaseRequest): Promise<ViewMealDetailsUseCaseResponse> {
    const meal = await this.mealsRepository.findById(idMeal)

    if (!meal) {
      throw new MealNotFoundError()
    }

    return { meal }
  }

}