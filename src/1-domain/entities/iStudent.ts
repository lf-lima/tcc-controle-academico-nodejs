import { IBaseEntity } from '#domain/entities/iBaseEntity'

export interface IStudent extends IBaseEntity {
  userId: number
  institutionId: number
  registrationNumber: number
  name: string
  documentNumber: string
}
