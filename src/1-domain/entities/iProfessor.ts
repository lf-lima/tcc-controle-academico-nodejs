import { IBaseEntity } from '#domain/entities/iBaseEntity'

export interface IProfessor extends IBaseEntity {
  userId: number
  institutionId: number
  name: string
}
