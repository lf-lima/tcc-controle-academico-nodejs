import { PartialBy } from '#business/utils/partialBy'
import Course from '#framework/models/mysql/course.model'
import { ICourse } from '#domain/entities/iCourse'
import { ICourseRepository } from '#business/repositories/iCourseRepository'

export class CourseRepository implements ICourseRepository {
  private readonly repo: typeof Course = Course

  async create (data: PartialBy<ICourse, 'id'>): Promise<ICourse> {
    return await this.repo.create(data as Course)
  }

  async findAllByInstitutionId (institutionId: number): Promise<ICourse[]> {
    return await this.repo.findAll({ where: { institutionId } })
  }
}
