import { CreateCourseUseCase } from '#business/useCases/course/createCourseUseCase'
import { ICourse } from '#domain/entities/iCourse'
import {
  HttpInternalErrorResponse,
  HttpOkResponse,
  IHttpResponse
} from '#gateway/modules/http/httpResponse'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'
import { InputCreateCourse } from '#gateway/serializers/course/inputCreateCourse'

export class CreateCourseOperation implements IBaseOperation<InputCreateCourse, ICourse> {
  private createCourseUseCase!: CreateCourseUseCase

  constructor (createCourseUseCase: CreateCourseUseCase) {
    this.createCourseUseCase = createCourseUseCase
  }

  async run (input: InputCreateCourse): Promise<IHttpResponse<ICourse>> {
    try {
      console.log('start create course operation, input: ', input)

      const course = await this.createCourseUseCase.run(input)

      console.log('created course: ', course)

      return new HttpOkResponse(course)
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
