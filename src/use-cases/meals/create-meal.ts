import { Meal } from "@prisma/client";
import { IMealsRepository } from "../../repositories/meals-repository";

interface CreateMealRequest {
  name: string;
  description: string;
  mealDatetime: Date | string;
  isOnDiet: boolean;
  userId: string;
}

interface CreateMealResponse {
  meal: Meal
}

export class CreateMealUseCase {

  constructor(
    private mealRepository: IMealsRepository
  ) { }

  async execute({ name, description, isOnDiet, mealDatetime, userId }: CreateMealRequest): Promise<CreateMealResponse> {

    const meal = await this.mealRepository.create({
      name,
      description,
      is_on_diet: isOnDiet,
      meal_datetime: mealDatetime,
      user_id: userId
    })

    return { meal }
  }

} 