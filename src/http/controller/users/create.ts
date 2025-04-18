import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CreateUserUseCase } from "../../../use-cases/users/create-user";
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user-already-exists-error";

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = createUserBodySchema.parse(request.body)

  const usersRepository = new PrismaUserRepository()
  const createUser = new CreateUserUseCase(usersRepository)

  try {
    await createUser.execute({
      name,
      email,
      password
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}