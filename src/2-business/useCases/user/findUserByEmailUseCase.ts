import { IUser } from '../../../1-domain/entities/iUser'
import { IFindUserByEmailDTO } from '../../dto/user'
import { IUserRepository } from '../../repositories/iUserRepository'

export interface IFindUserByEmailUseCase{
  run(dto: IFindUserByEmailDTO): Promise<IUser>
}

export class FindUserByEmailUseCase implements IFindUserByEmailUseCase {
  private repository!: IUserRepository

  constructor (repo: IUserRepository) {
    this.repository = repo
  }

  async run (dto: IFindUserByEmailDTO): Promise<IUser> {
    try {
      return await this.repository.findByEmail(dto.email)
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
