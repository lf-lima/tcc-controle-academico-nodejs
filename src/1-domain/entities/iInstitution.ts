import { IBaseEntity } from '#domain/entities/iBaseEntity'

export interface IInstitution extends IBaseEntity {
  name: string
  about: string
  userId: number
  email: string
}
