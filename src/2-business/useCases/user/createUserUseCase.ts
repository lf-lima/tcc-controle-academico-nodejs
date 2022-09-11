import { IUser } from '#domain/entities/iUser'
import { ICreateUserDTO } from '#business/dto/user'
import { IUserRepository } from '#business/repositories/iUserRepository'

export interface ICreateUserUseCase {
  run (dto: ICreateUserDTO): Promise<IUser>
}

export class CreateUserUseCase implements ICreateUserUseCase {
  private repository!: IUserRepository

  constructor (repo: IUserRepository) {
    this.repository = repo
  }

  async run (dto: ICreateUserDTO): Promise<IUser> {
    return await this.repository.create(dto)
  }
}
