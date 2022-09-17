import { UploadFileToSubjectUseCase } from '#business/useCases/subject/uploadFileToSubjectUseCase'
import {
  HttpInternalErrorResponse,
  HttpOkResponse,
  IHttpResponse
} from '#gateway/modules/http/httpResponse'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'
import { InputUploadFileToSubject } from '#gateway/serializers/subject/inputUploadFileToSubject'
import { OutputUploadFileToSubject } from '#gateway/serializers/subject/OutputUploadFileToSubject'

export class UploadFileToSubjectOperation implements IBaseOperation<InputUploadFileToSubject, OutputUploadFileToSubject> {
  private readonly uploadFileToSubjectUseCase!: UploadFileToSubjectUseCase

  constructor (uploadFileToSubjectUseCase: UploadFileToSubjectUseCase) {
    this.uploadFileToSubjectUseCase = uploadFileToSubjectUseCase
  }

  async run (input: InputUploadFileToSubject): Promise<IHttpResponse<OutputUploadFileToSubject>> {
    try {
      console.log('start upload file to subject operation, input: ', input)

      await this.uploadFileToSubjectUseCase.run(input)

      console.log('finish upload file to subject')

      return new HttpOkResponse({ success: true})
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
