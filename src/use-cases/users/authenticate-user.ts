import { User } from "@prisma/client";
import { IUsersRepository } from "../../repositories/users-repository";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-erro";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User
}


export class AuthenticateUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) { }
  async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user
    }

  }
}