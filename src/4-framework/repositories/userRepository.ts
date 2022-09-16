import User from '#framework/models/mysql/user.model'
import { IUserRepository } from '#business/repositories/iUserRepository'
import { IUser } from '#domain/entities/iUser'
import { CreateUserInputDto } from '#business/dto/user/createUserInputDto'
import Permission from '#framework/models/mysql/permission.model'
import Profile from '#framework/models/mysql/profile.model'

export class UserRepository implements IUserRepository {
  private readonly userRepository: typeof User = User

  async create (data: CreateUserInputDto): Promise<IUser> {
    return await this.userRepository.create(data as User)
  }

  async update (userId: number, data: { email?: string, password?: string }): Promise<IUser> {
    const [, [user]] = await this.userRepository.update(data, { where: { id: userId }, returning: true })
    return user
  }

  async delete (userId: number): Promise<void> {
    await this.userRepository.destroy({ where: { id: userId } })
  }

  async findAll (): Promise<IUser[]> {
    return await this.userRepository.findAll() as IUser[]
  }

  async findById (userId: number): Promise<IUser> {
    return await this.userRepository.findByPk(userId) as IUser
  }

  async findByDocumentNumber (documentNumber: string): Promise<IUser & { profile: { permissions: Permission[] } } | undefined> {
    return await this.userRepository.findOne({
      include: [Profile],
      where: { documentNumber }
    }) as any
  }
}
