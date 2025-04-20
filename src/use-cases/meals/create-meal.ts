import { Meal } from "@prisma/client";
import { IMealsRepository } from "../../repositories/meals-repository";

interface CreateMealRequest {
  name: string;
  description: string | null;
  mealDateTime: Date;
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

  async execute({ name, description, isOnDiet, mealDateTime, userId }: CreateMealRequest): Promise<CreateMealResponse> {

    const meal = await this.mealRepository.create({
      name,
      description: description ?? null,
      is_on_diet: isOnDiet,
      meal_datetime: mealDateTime,
      user_id: userId
    })

    return { meal }
  }

} 