import { IBaseEntity } from '#domain/entities/iBaseEntity'

export interface IInstitution extends IBaseEntity {
  userId: number
  email: string
}
