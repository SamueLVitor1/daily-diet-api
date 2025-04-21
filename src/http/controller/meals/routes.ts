import { FastifyInstance } from "fastify";
import { createMeal } from "./create";
import { updateMeal } from "./update";
import { deleteMeal } from "./delete";

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/meals', createMeal)
  app.put('/meals/:idMeal', updateMeal)
  app.delete('/meals/:idMeal', deleteMeal)
}