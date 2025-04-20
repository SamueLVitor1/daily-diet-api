import fastify from "fastify";
import { usersRoutes } from "./http/controller/users/routes";
import { mealsRoutes } from "./http/controller/meals/routes";

export const app = fastify()

app.register(usersRoutes)
app.register(mealsRoutes)