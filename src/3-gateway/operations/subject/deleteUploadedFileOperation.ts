import { DeleteUploadedFileUseCase } from '#business/useCases/subject/deleteUploadedFileUseCase'
import {
  HttpInternalErrorResponse,
  HttpOkResponse,
  IHttpResponse
} from '#gateway/modules/http/httpResponse'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'
import { InputDeleteUploadedFile } from '#gateway/serializers/subject/inputDeleteUploadedFile'
import { OutputDeleteUploadedFile } from '#gateway/serializers/subject/outputDeleteUploadedFile'

export class DeleteUploadedFileOperation implements IBaseOperation<InputDeleteUploadedFile, OutputDeleteUploadedFile> {
  constructor (
    private readonly deleteUploadedFileUseCase: DeleteUploadedFileUseCase
  ) { }

  async run (input: InputDeleteUploadedFile): Promise<IHttpResponse<OutputDeleteUploadedFile>> {
    try {
      console.log('start delete uploaded id operation, input: ', input)

      await this.deleteUploadedFileUseCase.run(input.uploadedFileId)

      console.log('finish delete uploaded id')

      return new HttpOkResponse({ success: true })
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
