import { IUser } from '#domain/entities/iUser'
import { IFindUserByEmailDTO } from '#business/dto/user'
import { IUserRepository } from '#business/repositories/iUserRepository'

export interface IFindUserByEmailUseCase {
  run (dto: IFindUserByEmailDTO): Promise<IUser>
}

export class FindUserByEmailUseCase implements IFindUserByEmailUseCase {
  private repository!: IUserRepository

  constructor (repo: IUserRepository) {
    this.repository = repo
  }

  async run (dto: IFindUserByEmailDTO): Promise<IUser> {
    return await this.repository.findByEmail(dto.email)
  }
}
