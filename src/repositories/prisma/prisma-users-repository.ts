import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../users-repository";
import { prisma } from "../../lib/prisma";

export class PrismaUserRepository implements IUsersRepository {

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }

}