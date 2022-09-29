import {
  HttpInternalErrorResponse,
  HttpOkResponse,
  IHttpResponse
} from '#gateway/modules/http/httpResponse'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'
import { ICourse } from '#domain/entities/iCourse'
import { InputGetAllCoursesByInstitutionId } from '#gateway/serializers/course/inputGetAllCoursesByInstitutionId'
import { GetAllCoursesByInstitutionIdUseCase } from '#business/useCases/course/getAllCoursesByInstitutionIdUseCase'

export class GetAllCoursesByInstitutionIdOperation implements IBaseOperation<InputGetAllCoursesByInstitutionId, ICourse[]> {
  private getAllCoursesByInstitutionIdUseCase!: GetAllCoursesByInstitutionIdUseCase

  constructor (getAllCoursesByInstitutionIdUseCase: GetAllCoursesByInstitutionIdUseCase) {
    this.getAllCoursesByInstitutionIdUseCase = getAllCoursesByInstitutionIdUseCase
  }

  async run (input: InputGetAllCoursesByInstitutionId): Promise<IHttpResponse<ICourse[]>> {
    try {
      console.log('start get all courses operation, input: ', input)

      const courses = await this.getAllCoursesByInstitutionIdUseCase.run(input.institutionId)

      console.log('found courses: ', courses)

      return new HttpOkResponse(courses)
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
