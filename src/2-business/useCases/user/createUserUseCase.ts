import { IUser } from '#domain/entities/iUser'
import { IUserRepository } from '#business/repositories/iUserRepository'

export interface ICreateUserUseCase {
  run (dto: Partial<IUser>): Promise<IUser>
}

export class CreateUserUseCase implements ICreateUserUseCase {
  private repository!: IUserRepository

  constructor (repo: IUserRepository) {
    this.repository = repo
  }

  async run (input: Partial<IUser>): Promise<IUser> {
    return await this.repository.create(input)
  }
}
