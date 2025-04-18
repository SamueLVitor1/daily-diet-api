import { User } from "@prisma/client";
import { IUsersRepository } from "../../repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {

  constructor(
    private usersRepository: IUsersRepository
  ) { }

  async execute({ name, email, password }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const emailExists = await this.usersRepository.findByEmail(email)

    if (emailExists) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password: password_hash
    })

    return {
      user
    }

  }

}