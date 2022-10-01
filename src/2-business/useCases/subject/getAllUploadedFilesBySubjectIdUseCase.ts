import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { IUploadedFile } from '#domain/entities/iUploadedFile'
import { IUploadedFileRepository } from '#business/repositories/iUploadedFileRepository'

export class GetAllUploadedFilesBySubjectIdUseCase implements IBaseUseCase<number, IUploadedFile[]> {
  constructor (
    private uploadedFilesRepository: IUploadedFileRepository
  ) { }

  async run (subjectId: number): Promise<IUploadedFile[]> {
    console.log('start get all uploaded files by subject id use case, subjectId: ', subjectId)

    const uploadedFiles = await this.uploadedFilesRepository.findAllUploadedFilesBySubjectId(subjectId)

    console.log('uploaded files: ', uploadedFiles)

    return uploadedFiles
  }
}
