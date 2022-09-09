import { IUser } from '../../../1-domain/entities/iUser'
import { IFindUserByIdDTO } from '../../dto/user'
import { IUserRepository } from '../../repositories/iUserRepository'

export interface IFindUserByIdUseCase {
  run(dto: IFindUserByIdDTO): Promise<IUser>
}

export class FindUserByIdUseCase implements IFindUserByIdUseCase {
  private repository!: IUserRepository

  constructor (repo: IUserRepository) {
    this.repository = repo
  }

  async run (dto: IFindUserByIdDTO): Promise<IUser> {
    try {
      return await this.repository.findById(dto.userId)
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
