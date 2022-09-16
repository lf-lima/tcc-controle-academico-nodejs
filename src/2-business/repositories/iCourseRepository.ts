import { CreateCourseInputDto } from '#business/dto/course/createCourseInputDto'
import { ICourse } from '#domain/entities/iCourse'

export interface ICourseRepository {
  create(data: CreateCourseInputDto): Promise<ICourse>
}
