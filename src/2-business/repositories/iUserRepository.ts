import { CreateUserInputDto } from '#business/dto/user/createUserInputDto'
import { IUser } from '#domain/entities/iUser'
import Permission from '#framework/models/mysql/permission.model'

export interface IUserRepository {
  create(data: CreateUserInputDto): Promise<IUser>
  update(userId: number, data: { email?: string, password?: string}): Promise<IUser>
  delete(userId: number): Promise<void>
  findAll(): Promise<IUser[]>
  findById(userId: number): Promise<IUser | undefined>
  findByDocumentNumber(documentNumber: string): Promise<IUser & { permissions: Permission[] } | undefined>
}
