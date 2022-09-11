import { IBaseEntity } from '#domain/entities/iBaseEntity'

export interface IUser extends IBaseEntity{
  email: string,
  password: string
}
