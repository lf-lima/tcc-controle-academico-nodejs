import { IBaseEntity } from '#domain/entities/iBaseEntity'

export interface ICourse extends IBaseEntity {
  institutionId: number
  courseName: string
  courseDescription: string
}
