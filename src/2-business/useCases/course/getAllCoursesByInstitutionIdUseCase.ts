import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { ICourseRepository } from '#business/repositories/iCourseRepository'
import { ICourse } from '#domain/entities/iCourse'

export class GetAllCoursesByInstitutionIdUseCase implements IBaseUseCase<number, ICourse[]> {
  private courseRepository!: ICourseRepository

  constructor (courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository
  }

  async run (institutionId: number): Promise<ICourse[]> {
    console.log('start get all courses use case')

    const courses = await this.courseRepository.findAllByInstitutionId(institutionId)

    console.log('courses: ', courses)

    return courses
  }
}
