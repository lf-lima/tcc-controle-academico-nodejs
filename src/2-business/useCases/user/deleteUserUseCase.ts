import { IDeleteUserDTO } from '#business/dto/user'
import { IUserRepository } from '#business/repositories/iUserRepository'

export interface IDeleteUserUseCase {
  run (dto: IDeleteUserDTO): Promise<void>
}

export class DeleteUserUseCase implements IDeleteUserUseCase {
  private repository!: IUserRepository

  constructor (repo: IUserRepository) {
    this.repository = repo
  }

  async run (dto: IDeleteUserDTO): Promise<void> {
    await this.repository.delete(dto.userId)
  }
}
