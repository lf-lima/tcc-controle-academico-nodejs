import { IBaseEntity } from '#domain/entities/iBaseEntity'

export interface IProfessor extends IBaseEntity {
  userId: number
  institutionId: number
  registrationNumber: number
  name: string
  documentNumber: number
}
