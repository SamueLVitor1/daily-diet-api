import { Meal } from "@prisma/client";
import { IMealsRepository } from "../../repositories/meals-repository";

interface ListMealsUseCaseRequest {
  userId: string;
}

interface ListMealsUseCaseResponse {
  meals: Meal[] | null;
}

export class ListMealsUseCase {

  constructor(private mealsRepository: IMealsRepository) { }

  async execute({ userId }: ListMealsUseCaseRequest): Promise<ListMealsUseCaseResponse> {

    const meals = await this.mealsRepository.findAllByUserId(userId)

    return {
      meals
    }
  }

}