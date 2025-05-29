import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../../../use-cases/users/authenticate-user";
import { InvalidCredentialsError } from "../../../use-cases/errors/invalid-credentials-erro";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {

  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUserRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    const { user } = await authenticateUseCase.execute({
      email,
      password
    })

    const token = await reply.jwtSign(
      { sub: user.id },
      { expiresIn: '7d' }
    )

    return reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }

    throw error
  }

}