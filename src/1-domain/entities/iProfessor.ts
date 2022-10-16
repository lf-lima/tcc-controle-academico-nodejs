import { IBaseEntity } from '#domain/entities/iBaseEntity'
import { IUser } from '#domain/entities/iUser'

export interface IProfessor extends IBaseEntity {
  userId: number
  institutionId: number
  name: string
  user?: IUser
}
