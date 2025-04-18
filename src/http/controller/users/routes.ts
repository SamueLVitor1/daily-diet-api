import { FastifyInstance } from "fastify";
import { createUser } from "./create";

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', createUser)
}