import { IBaseEntity } from '#domain/entities/iBaseEntity'

export interface IUser extends IBaseEntity {
  password: string
  profileId: number
}
