import { IBaseEntity } from '#domain/entities/iBaseEntity'

export interface IAdmin extends IBaseEntity {
  documentNumber: string
  userId: number
}
