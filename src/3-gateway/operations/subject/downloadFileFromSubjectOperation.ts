import { DownloadFileFromSubjectUseCase } from '#business/useCases/subject/downloadFileFromSubjectUseCase'
import {
  HttpInternalErrorResponse,
  HttpOkResponse,
  IHttpResponse
} from '#gateway/modules/http/httpResponse'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'
import { InputDownloadFileFromSubject } from '#gateway/serializers/subject/inputDownloadFileOfSubject'
import { OutputDownloadFileFromSubject } from '#gateway/serializers/subject/outputDownloadFileOfSubject'

export class DownloadFileFromSubjectOperation implements IBaseOperation<InputDownloadFileFromSubject, OutputDownloadFileFromSubject> {
  private readonly downloadFileFromSubjectUseCase!: DownloadFileFromSubjectUseCase

  constructor (downloadFileFromSubjectUseCase: DownloadFileFromSubjectUseCase) {
    this.downloadFileFromSubjectUseCase = downloadFileFromSubjectUseCase
  }

  async run (input: InputDownloadFileFromSubject): Promise<IHttpResponse<OutputDownloadFileFromSubject>> {
    try {
      console.log('start download file of subject operation, input: ', input)

      const downloadUrl = await this.downloadFileFromSubjectUseCase.run(input)

      console.log('finish download file of subject')

      return new HttpOkResponse({ downloadUrl })
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
