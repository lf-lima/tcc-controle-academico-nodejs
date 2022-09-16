import { IBaseEntity } from '#domain/entities/iBaseEntity'

export interface IAdmin extends IBaseEntity {
  name: string
  userId: number
}
