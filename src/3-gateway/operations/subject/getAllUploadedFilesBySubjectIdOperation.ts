import { GetAllUploadedFilesBySubjectIdUseCase } from '#business/useCases/subject/getAllUploadedFilesBySubjectIdUseCase'
import { IUploadedFile } from '#domain/entities/iUploadedFile'
import {
  HttpInternalErrorResponse,
  HttpOkResponse,
  IHttpResponse
} from '#gateway/modules/http/httpResponse'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'
import { InputGetAllUploadedFilesBySubjectId } from '#gateway/serializers/subject/inputGetAllUploadedFilesBySubjectId'

export class GetAllUploadedFilesBySubjectIdOperation implements IBaseOperation<InputGetAllUploadedFilesBySubjectId, IUploadedFile[]> {
  constructor (
    private getAllUploadedFilesBySubjectIdUseCase: GetAllUploadedFilesBySubjectIdUseCase
  ) { }

  async run (input: InputGetAllUploadedFilesBySubjectId): Promise<IHttpResponse<IUploadedFile[]>> {
    console.log('start get subject by id operation, input: ', input)

    try {
      const uploadedFiles = await this.getAllUploadedFilesBySubjectIdUseCase.run(input.subjectId)

      console.log('uploaded files: ', uploadedFiles)

      return new HttpOkResponse(uploadedFiles)
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
