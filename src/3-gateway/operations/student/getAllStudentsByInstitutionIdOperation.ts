import {
  HttpInternalErrorResponse,
  HttpOkResponse,
  IHttpResponse
} from '#gateway/modules/http/httpResponse'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'
import { IProfessor } from '#domain/entities/iProfessor'
import { InputGetAllStudentsByInstitutionId } from '#gateway/serializers/student/inputGetAllStudentsByInstitutionId'
import { GetAllStudentsByInstitutionIdUseCase } from '#business/useCases/student/getAllStudentsByInstitutionIdUseCase'

export class GetAllStudentsByInstitutionIdOperation implements IBaseOperation<InputGetAllStudentsByInstitutionId, IProfessor[]> {
  constructor (
    private getAllStudentsByInstitutionIdUseCase: GetAllStudentsByInstitutionIdUseCase
  ) { }

  async run (input: InputGetAllStudentsByInstitutionId): Promise<IHttpResponse<IProfessor[]>> {
    try {
      console.log('start get all students operation, input: ', input)

      const students = await this.getAllStudentsByInstitutionIdUseCase.run(input.institutionId)

      console.log('found students: ', students)

      return new HttpOkResponse(students)
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
