import { IBaseEntity } from '#domain/entities/iBaseEntity'
import { ICourse } from '#domain/entities/iCourse'
import { IUser } from '#domain/entities/iUser'

export interface IStudent extends IBaseEntity {
  userId: number
  institutionId: number
  name: string
  courseId: number
  user?: IUser
  course?: ICourse
}
