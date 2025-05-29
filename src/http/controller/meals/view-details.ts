import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaMealsRepository } from "../../../repositories/prisma/prisma-meals-repository";
import { ViewMealDetailsUseCase } from "../../../use-cases/meals/view-meal-datails";
import { MealNotFoundError } from "../../../use-cases/errors/meal-not-found-error";

export async function viewDetailsMeal(request: FastifyRequest, reply: FastifyReply) {

  const viewDetailsMealParamsSchema = z.object({
    idMeal: z.string().uuid()
  })

  const { idMeal } = viewDetailsMealParamsSchema.parse(request.params)

  const mealRepository = new PrismaMealsRepository()
  const viewMealDetailsUseCase = new ViewMealDetailsUseCase(mealRepository)

  try {
    const { meal } = await viewMealDetailsUseCase.execute({ idMeal })
    return reply.status(200).send({ meal: meal })
  } catch (error) {
    if (error instanceof MealNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    return reply.status(500).send({
      message: 'Erro interno do servidor.'
    })
  }
}