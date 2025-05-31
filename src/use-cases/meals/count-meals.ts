import { IMealsRepository } from "../../repositories/meals-repository";

interface CountMealsUseCaseResponse {
  count: number;
}

export class CountMealsUseCase {

  constructor(private mealsRepository: IMealsRepository) { }

  async execute(userId: string): Promise<CountMealsUseCaseResponse> {
    const mealsCount = await this.mealsRepository.countMealsByUserId(userId);

    return { count: mealsCount }
  }

}