import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { CreateCourseInputDto } from '#business/dto/course/createCourseInputDto'
import { ICourse } from '#domain/entities/iCourse'
import { ICourseRepository } from '#business/repositories/iCourseRepository'

export class CreateCourseUseCase implements IBaseUseCase<CreateCourseInputDto, ICourse> {
  private courseRepository!: ICourseRepository

  constructor (courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository
  }

  async run (input: CreateCourseInputDto): Promise<ICourse> {
    console.log('start create course use case: ', input)

    const { institutionId, courseDescription, courseName } = input

    const course = await this.courseRepository.create({
      courseDescription,
      institutionId,
      courseName
    })

    console.log('course created: ', course)

    return course
  }
}
