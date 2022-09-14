import { IUser } from '#domain/entities/iUser'

export interface IUserRepository {
  create(data: Partial<IUser>): Promise<IUser>
  update(userId: number, data: { email?: string, password?: string}): Promise<IUser>
  delete(userId: number): Promise<void>
  findAll(): Promise<IUser[]>
  findById(userId: number): Promise<IUser | undefined>
}
