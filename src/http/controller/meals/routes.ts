import { FastifyInstance } from "fastify";
import { createMeal } from "./create";
import { updateMeal } from "./update";
import { deleteMeal } from "./delete";
import { viewDetailsMeal } from "./view-details";
import { verifyJWT } from "../../middlewares/verify-jwt";

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/meals', createMeal)
  app.put('/meals/:idMeal/update', updateMeal)
  app.delete('/meals/:idMeal/delete', deleteMeal)
  app.get('/meals/:idMeal/view-details', viewDetailsMeal)
}