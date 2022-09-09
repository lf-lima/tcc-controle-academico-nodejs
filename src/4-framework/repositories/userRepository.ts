import { IUserRepository } from '../../2-business/repositories/iUserRepository'
import { IUser } from '../../1-domain/entities/iUser'
import User from '../models/sequelize/user.model'

export class UserRepository implements IUserRepository {
  public userRepository!: typeof User

  constructor (repo: typeof User) {
    this.userRepository = repo
  }

  async create (data: { email: string, password: string}): Promise<IUser> {
    try {
      const { id } = await this.userRepository.create(data)
      return await this.findById(id)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async update (userId: number, data: { email?: string, password?: string}): Promise<IUser> {
    try {
      await this.userRepository.update(data, { where: { id: userId } })
      return await this.findById(userId)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async delete (userId: number): Promise<void> {
    try {
      await this.userRepository.destroy({ where: { id: userId } })
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async findAll (): Promise<IUser[]> {
    try {
      return await this.userRepository.findAll() as IUser[]
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async findById (userId: number): Promise<IUser> {
    try {
      return await this.userRepository.findByPk(userId) as IUser
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async findByEmail (userEmail: string): Promise<IUser> {
    try {
      return await this.userRepository.findOne({ where: { email: userEmail } }) as IUser
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
