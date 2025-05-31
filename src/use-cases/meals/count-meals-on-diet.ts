import { IMealsRepository } from "../../repositories/meals-repository";

interface CountMealsUseCaseResponse {
  count: number;
}

export class CountMealsOnDietUseCase {

  constructor(private mealsRepository: IMealsRepository) { }

  async execute(userId: string): Promise<CountMealsUseCaseResponse> {
    const mealsCount = await this.mealsRepository.countMealsOnDietByUser(userId);

    return { count: mealsCount }
  }

}