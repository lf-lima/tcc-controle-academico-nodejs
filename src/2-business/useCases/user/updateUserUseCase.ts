import { IUser } from '#domain/entities/iUser'
import { IUpdateUserDTO } from '#business/dto/user'
import { IUserRepository } from '#business/repositories/iUserRepository'

export interface IUpdateUserUseCase {
  run (dto: IUpdateUserDTO): Promise<IUser>
}

export class UpdateUserUseCase implements IUpdateUserUseCase {
  private repository!: IUserRepository

  constructor (repo: IUserRepository) {
    this.repository = repo
  }

  async run (dto: IUpdateUserDTO): Promise<IUser> {
    await this.repository.update(dto.userId, {
      email: dto.email, password: dto.password
    })

    return this.repository.findById(dto.userId)
  }
}
