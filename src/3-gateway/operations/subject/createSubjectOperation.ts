import { CreateSubjectUseCase } from '#business/useCases/subject/createSubjectUseCase'
import { ISubject } from '#domain/entities/iSubject'
import {
  HttpInternalErrorResponse,
  HttpOkResponse,
  IHttpResponse
} from '#gateway/modules/http/httpResponse'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'
import { InputCreateSubject } from '#gateway/serializers/subject/inputCreateSubject'

export class CreateSubjectOperation implements IBaseOperation<InputCreateSubject, ISubject> {
  private createSubjectUseCase!: CreateSubjectUseCase

  constructor (createSubjectUseCase: CreateSubjectUseCase) {
    this.createSubjectUseCase = createSubjectUseCase
  }

  async run (input: InputCreateSubject): Promise<IHttpResponse<ISubject>> {
    try {
      console.log('start create subject operation, input: ', input)

      const subject = await this.createSubjectUseCase.run(input)

      console.log('created subject: ', subject)

      return new HttpOkResponse(subject)
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
