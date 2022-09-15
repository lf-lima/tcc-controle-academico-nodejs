import { CreateUserInputDto } from '#business/dto/user/createUserInputDto'
import { IUser } from '#domain/entities/iUser'

export interface IUserRepository {
  create(data: CreateUserInputDto): Promise<IUser>
  update(userId: number, data: { email?: string, password?: string}): Promise<IUser>
  delete(userId: number): Promise<void>
  findAll(): Promise<IUser[]>
  findById(userId: number): Promise<IUser | undefined>
}
