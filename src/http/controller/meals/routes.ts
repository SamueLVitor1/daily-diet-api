import { FastifyInstance } from "fastify";
import { createMeal } from "./create";

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/meals', createMeal)
}