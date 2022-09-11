import { IUser } from '#domain/entities/iUser'
import { IUserRepository } from '#business/repositories/iUserRepository'

export interface IFindAllUsersUseCase {
  run (): Promise<IUser[]>
}
export class FindAllUsersUseCase implements IFindAllUsersUseCase {
  private repository!: IUserRepository

  constructor (repo: IUserRepository) {
    this.repository = repo
  }

  async run (): Promise<IUser[]> {
    return this.repository.findAll()
  }
}
