import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: new Date
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => {
      return user.email === email
    })

    if (!user) {
      return null
    }

    return user
  }

}