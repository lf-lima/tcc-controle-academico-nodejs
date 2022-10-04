import { IBaseEntity } from '#domain/entities/iBaseEntity'

export interface IStudent extends IBaseEntity {
  userId: number
  institutionId: number
  name: string
  courseId: number
}
