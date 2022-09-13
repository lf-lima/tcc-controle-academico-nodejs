import { IBaseEntity } from '#domain/entities/iBaseEntity'

export interface ISubjectStudent extends IBaseEntity {
  subjectId: number
  studentId: number
}
