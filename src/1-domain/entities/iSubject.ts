import { IBaseEntity } from '#domain/entities/iBaseEntity'

export interface ISubject extends IBaseEntity {
  institutionId: number
  courseId: number
  professorId: number
  subjectName: string
  subjectDescription: string
}
