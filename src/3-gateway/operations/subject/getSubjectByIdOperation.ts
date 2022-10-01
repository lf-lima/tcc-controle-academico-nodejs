import { GetSubjectByIdUseCase } from '#business/useCases/subject/getSubjectByIdUseCase'
import { ISubject } from '#domain/entities/iSubject'
import {
  HttpInternalErrorResponse,
  HttpOkResponse,
  IHttpResponse
} from '#gateway/modules/http/httpResponse'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'
import { InputGetSubjectById } from '#gateway/serializers/subject/inputGetSubjectById'

export class GetSubjectByIdOperation implements IBaseOperation<InputGetSubjectById, ISubject> {
  constructor (
    private getSubjectByIdUseCase: GetSubjectByIdUseCase
  ) { }

  async run (input: InputGetSubjectById): Promise<IHttpResponse<ISubject>> {
    console.log('start get subject by id operation, input: ', input)

    try {
      const subject = await this.getSubjectByIdUseCase.run(input.subjectId)

      console.log('subject: ', subject)

      return new HttpOkResponse(subject)
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
