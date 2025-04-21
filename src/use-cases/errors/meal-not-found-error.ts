export class MealNotFoundError extends Error {
  constructor() {
    super('Refeição não encontrada.')
  }
}