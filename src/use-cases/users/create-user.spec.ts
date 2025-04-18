import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { CreateUserUseCase } from "./create-user";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

describe('Create User Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)
  })

  it('should be able to create a new user', async () => {
    const { user } = await createUserUseCase.execute({
      name: 'samuel teste',
      email: 'samuelteste@gmail.com',
      password: '12345'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not allow to register with the same email twice', async () => {
    await createUserUseCase.execute({
      name: 'samuel teste',
      email: 'samuelteste@gmail.com',
      password: '12345'
    })

    await expect(() => createUserUseCase.execute({
      name: 'samuel teste',
      email: 'samuelteste@gmail.com',
      password: '12345'
    })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})