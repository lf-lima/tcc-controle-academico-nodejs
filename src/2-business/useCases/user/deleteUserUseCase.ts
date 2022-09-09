import { IDeleteUserDTO } from '../../dto/user'
import { IUserRepository } from '../../repositories/iUserRepository'

export interface IDeleteUserUseCase {
  run(dto: IDeleteUserDTO): Promise<void>
}

export class DeleteUserUseCase implements IDeleteUserUseCase {
  private repository!: IUserRepository

  constructor (repo: IUserRepository) {
    this.repository = repo
  }

  async run (dto: IDeleteUserDTO): Promise<void> {
    try {
      await this.repository.delete(dto.userId)
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
