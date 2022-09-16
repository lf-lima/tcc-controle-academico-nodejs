import { IBaseEntity } from '#domain/entities/iBaseEntity'

export interface IUser extends IBaseEntity {
  documentNumber: string
  password: string
  profileId: number
}
