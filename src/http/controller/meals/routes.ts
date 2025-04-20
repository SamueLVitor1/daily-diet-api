import { FastifyInstance } from "fastify";
import { createMeal } from "./create";
import { updateMeal } from "./update";

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/meals', createMeal)
  app.put('/meals/:idMeal', updateMeal)
}