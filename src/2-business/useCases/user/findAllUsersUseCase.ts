import { IUser } from '../../../1-domain/entities/iUser'
import { IUserRepository } from '../../repositories/iUserRepository'

export interface IFindAllUsersUseCase {
  run(): Promise<IUser[]>
}
export class FindAllUsersUseCase implements IFindAllUsersUseCase {
  private repository!: IUserRepository

  constructor (repo: IUserRepository) {
    this.repository = repo
  }

  async run (): Promise<IUser[]> {
    try {
      return this.repository.findAll()
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
