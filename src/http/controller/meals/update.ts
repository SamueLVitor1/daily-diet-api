import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaMealsRepository } from "../../../repositories/prisma/prisma-meals-repository";
import { UpdateMealUseCase } from "../../../use-cases/meals/update-meal";

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
    return reply.status(400).send({ message: 'Erro ao atualizar refeição.' })
  }

}