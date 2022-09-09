import { IUser } from '../../1-domain/entities/iUser'

export interface IUserRepository {
  create(data: { email: string, password: string}): Promise<IUser>
  update(userId: number, data: { email?: string, password?: string}): Promise<IUser>
  delete(userId: number): Promise<void>
  findAll(): Promise<IUser[]>
  findById(userId: number): Promise<IUser>
  findByEmail(userEmail: string): Promise<IUser>
}
