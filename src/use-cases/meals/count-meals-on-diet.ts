import { IMealsRepository } from "../../repositories/meals-repository";

interface CountMealsOnDietUseCaseResponse {
  count: number;
}

export class CountMealsOnDietUseCase {

  constructor(private mealsRepository: IMealsRepository) { }

  async execute(userId: string): Promise<CountMealsOnDietUseCaseResponse> {
    const mealsCount = await this.mealsRepository.countMealsOnDietByUser(userId);

    return { count: mealsCount }
  }

}