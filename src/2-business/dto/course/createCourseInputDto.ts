import { PartialBy } from '#business/utils/partialBy'
import { ICourse } from '#domain/entities/iCourse'

export type CreateCourseInputDto = PartialBy<ICourse, 'id'>
