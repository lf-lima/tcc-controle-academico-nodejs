import { IBaseEntity } from './iBaseEntity'

export interface IUser extends IBaseEntity{
  email: string,
  password: string
}
