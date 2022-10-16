import { IBaseEntity } from '#domain/entities/iBaseEntity'
import { IUser } from '#domain/entities/iUser'

export interface IInstitution extends IBaseEntity {
  name: string
  about: string
  userId: number
  user?: IUser
}
