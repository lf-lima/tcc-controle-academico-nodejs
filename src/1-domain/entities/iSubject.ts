import { IBaseEntity } from '#domain/entities/iBaseEntity'
import { ICourse } from '#domain/entities/iCourse'
import { IProfessor } from '#domain/entities/iProfessor'

export interface ISubject extends IBaseEntity {
  institutionId: number
  courseId: number
  professorId: number
  subjectName: string
  subjectDescription: string
  professor?: IProfessor
  course?: ICourse
}
