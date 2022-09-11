import User from '#framework/models/mysql/user.model'
import { IUserRepository } from '#business/repositories/iUserRepository'
import { IUser } from '#domain/entities/iUser'

export class UserRepository implements IUserRepository {
  private readonly userRepository: typeof User = User

  async create (data: { email: string, password: string }): Promise<IUser> {
    return await this.userRepository.create(data)
  }

  async update (userId: number, data: { email?: string, password?: string }): Promise<IUser> {
    const [, [user]] = await this.userRepository.update(data, { where: { id: userId } })
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

  async findByEmail (userEmail: string): Promise<IUser> {
    return await this.userRepository.findOne({ where: { email: userEmail } }) as IUser
  }
}
