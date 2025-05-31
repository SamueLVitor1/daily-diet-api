import { IMealsRepository } from "../../repositories/meals-repository";

interface CountMealsOffDietUseCaseResponse {
  count: number;
}

export class CountMealsOffDietUseCase {

  constructor(private mealsRepository: IMealsRepository) { }

  async execute(userId: string): Promise<CountMealsOffDietUseCaseResponse> {
    const mealsCount = await this.mealsRepository.countMealsOffDietByUser(userId);

    return { count: mealsCount }
  }

}