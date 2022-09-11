import { IUser } from '#domain/entities/iUser'
import { IFindUserByIdDTO } from '#business/dto/user'
import { IUserRepository } from '#business/repositories/iUserRepository'

export interface IFindUserByIdUseCase {
  run (dto: IFindUserByIdDTO): Promise<IUser>
}

export class FindUserByIdUseCase implements IFindUserByIdUseCase {
  private repository!: IUserRepository

  constructor (repo: IUserRepository) {
    this.repository = repo
  }

  async run (dto: IFindUserByIdDTO): Promise<IUser> {
    return await this.repository.findById(dto.userId)
  }
}
