import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaMealsRepository } from "../../../repositories/prisma/prisma-meals-repository";
import { CreateMealUseCase } from "../../../use-cases/meals/create-meal";

export async function createMeal(request: FastifyRequest, reply: FastifyReply) {

  const createMealBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable().optional(),
    mealDateTime: z.coerce.date(),
    isOnDiet: z.boolean(),
    userId: z.string()
  })

  const { name, description, mealDateTime, isOnDiet, userId } = createMealBodySchema.parse(request.body)

  const mealRepository = new PrismaMealsRepository()
  const createMealUseCase = new CreateMealUseCase(mealRepository)

  try {
    await createMealUseCase.execute({
      name,
      description: description ?? null,
      mealDateTime, isOnDiet, userId
    })

    return reply.status(201).send()

  } catch (error) {
    return reply.status(400).send({ message: 'Erro ao criar refeição.' })

  }

}