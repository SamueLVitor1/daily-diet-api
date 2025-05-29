import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { CreateUserUseCase } from "./create-user";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";
import { AuthenticateUseCase } from "./authenticate-user";
import { hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'samuel teste',
      email: 'samuelteste@gmail.com',
      password: await hash('12345', 6)
    })

    const { user } = await authenticateUseCase.execute({
      email: 'samuelteste@gmail.com',
      password: '12345'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  // it('should not allow to register with the same email twice', async () => {
  //   await createUserUseCase.execute({
  //     name: 'samuel teste',
  //     email: 'samuelteste@gmail.com',
  //     password: '12345'
  //   })

  //   await expect(() => createUserUseCase.execute({
  //     name: 'samuel teste',
  //     email: 'samuelteste@gmail.com',
  //     password: '12345'
  //   })
  //   ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  // })
})