import { IUser } from '../../../1-domain/entities/iUser'
import { ICreateUserDTO } from '../../dto/user'
import { IUserRepository } from '../../repositories/iUserRepository'

export interface ICreateUserUseCase {
  run(dto: ICreateUserDTO): Promise<IUser>
}

export class CreateUserUseCase implements ICreateUserUseCase {
  private repository!: IUserRepository

  constructor (repo: IUserRepository) {
    this.repository = repo
  }

  async run (dto: ICreateUserDTO): Promise<IUser> {
    try {
      return await this.repository.create(dto)
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
