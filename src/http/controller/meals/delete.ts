import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaMealsRepository } from "../../../repositories/prisma/prisma-meals-repository";
import { DeleteMealUseCase } from "../../../use-cases/meals/delete-meal";
import { MealNotFoundError } from "../../../use-cases/errors/meal-not-found-error";
import { UnauthorizedAccessError } from "../../../use-cases/errors/unauthorized-access-error";

export async function deleteMeal(request: FastifyRequest, reply: FastifyReply) {

  const deleteMealParamsSchema = z.object({
    idMeal: z.string().uuid()
  })

  const { idMeal } = deleteMealParamsSchema.parse(request.params)
  const userId = request.user.sub
  const mealRepository = new PrismaMealsRepository()
  const deleteMealUseCase = new DeleteMealUseCase(mealRepository)

  try {
    await deleteMealUseCase.execute({
      idMeal, userId
    })
    return reply.status(204).send()
  } catch (error) {
    if (error instanceof MealNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    if (error instanceof UnauthorizedAccessError) {
      return reply.status(403).send({ message: error.message }) 
    }

    return reply.status(500).send({ message: 'Erro interno do servidor.' })
  }

}