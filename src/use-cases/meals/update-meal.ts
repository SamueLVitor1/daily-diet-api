import { Meal } from "@prisma/client";
import { IMealsRepository } from "../../repositories/meals-repository";

interface UpdateMealRequest {
  name?: string;
  description?: string | null;
  mealDateTime?: Date | string;
  isOnDiet?: boolean;
}

interface UpdateMealResponse {
  meal: Meal
}

export class UpdateMealUseCase {

  constructor(
    private mealsRepository: IMealsRepository,
  ) { }


  async execute({ name, description, isOnDiet, mealDateTime }: UpdateMealRequest, idMeal: string): Promise<UpdateMealResponse> {
    const meal = await this.mealsRepository.update({
      name: name,
      description: description ?? null,
      is_on_diet: isOnDiet,
      meal_datetime: mealDateTime,
    }, idMeal)

    return { meal }

  }

}