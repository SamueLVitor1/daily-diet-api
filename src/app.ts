import fastify from "fastify";
import { usersRoutes } from "./http/controller/users/routes";
import { mealsRoutes } from "./http/controller/meals/routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";

export const app = fastify()

app.register(fastifyJwt,{
  secret: env.JWT_SECRET
})

app.register(usersRoutes)
app.register(mealsRoutes)