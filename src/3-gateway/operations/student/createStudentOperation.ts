import { CreateStudentUseCase } from '#business/useCases/student/createStudentUseCase'
import { IStudent } from '#domain/entities/iStudent'
import {
  HttpInternalErrorResponse,
  HttpOkResponse,
  IHttpResponse
} from '#gateway/modules/http/httpResponse'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'
import { InputCreateStudent } from '#gateway/serializers/student/inputCreateStudent'

export class CreateStudentOperation implements IBaseOperation<InputCreateStudent, IStudent> {
  private createStudentUseCase!: CreateStudentUseCase

  constructor (createStudentUseCase: CreateStudentUseCase) {
    this.createStudentUseCase = createStudentUseCase
  }

  async run (input: InputCreateStudent): Promise<IHttpResponse<IStudent>> {
    try {
      console.log('start create student operation, input: ', input)

      const student = await this.createStudentUseCase.run(input)

      console.log('created student: ', student)

      return new HttpOkResponse(student)
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
