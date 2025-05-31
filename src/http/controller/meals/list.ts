import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaMealsRepository } from "../../../repositories/prisma/prisma-meals-repository";
import { ListMealsUseCase } from "../../../use-cases/meals/list-meals";

export async function listMeals(request: FastifyRequest, reply: FastifyReply) {

  const userId = request.user.sub;

  const mealRepository = new PrismaMealsRepository()
  const listMealsUseCase = new ListMealsUseCase(mealRepository)

  try {
    const meals = await listMealsUseCase.execute({
      userId
    })

    return reply.status(200).send(meals);
  } catch (error) {
    return reply.status(500).send({ message: 'Erro interno do servidor.' });
  }
}