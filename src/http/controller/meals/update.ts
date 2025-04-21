import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaMealsRepository } from "../../../repositories/prisma/prisma-meals-repository";
import { UpdateMealUseCase } from "../../../use-cases/meals/update-meal";
import { MealNotFoundError } from "../../../use-cases/errors/meal-not-found-error";

export async function updateMeal(request: FastifyRequest, reply: FastifyReply) {

  const updateMealParamsSchema = z.object({
    idMeal: z.string().uuid()
  })

  const updateMealBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().nullable().optional(),
    mealDateTime: z.coerce.date().optional(),
    isOnDiet: z.boolean().optional()
  })

  const { idMeal } = updateMealParamsSchema.parse(request.params)
  const { name, description, isOnDiet, mealDateTime } = updateMealBodySchema.parse(request.body)

  const mealRepository = new PrismaMealsRepository()
  const updateMealUseCase = new UpdateMealUseCase(mealRepository)


  try {
    const { meal } = await updateMealUseCase.execute({
      name,
      description,
      isOnDiet,
      mealDateTime
    }, idMeal)

    return reply.status(200).send({ meal })

  } catch (error) {
    if (error instanceof MealNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    return reply.status(500).send({ message: 'Erro interno do servidor.' })
  }

}