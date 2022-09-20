import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { UploadFileToSubjectInputDto } from '#business/dto/subject/uploadFileToSubjectInputDto'
import { IUploadFileService } from '#business/services/iUploadFileService'
import { IUploadedFileRepository } from '#business/repositories/iUploadedFileRepository'

export class UploadFileToSubjectUseCase implements IBaseUseCase<UploadFileToSubjectInputDto, void> {
  private uploadedFileToRepository!: IUploadedFileRepository
  private uploadService!: IUploadFileService

  constructor (
    uploadedFileToRepository: IUploadedFileRepository,
    uploadService: IUploadFileService
  ) {
    this.uploadedFileToRepository = uploadedFileToRepository
    this.uploadService = uploadService
  }

  async run (input: UploadFileToSubjectInputDto): Promise<void> {
    console.log('start upload file to subject use case: ', input)

    const { fileName: fileNameWithExtension, subjectId, fileBuffer, professorId } = input
    const [fileName, fileExtension] = fileNameWithExtension.split('.')

    const { id: uploadedFileId } = await this.uploadedFileToRepository.create({ subjectId, professorId, extension: fileExtension, fileName })

    const newFileName = `${fileName}_${uploadedFileId}.${fileExtension}`

    await this.uploadService.upload({ fileName: newFileName, fileExtension, fileBuffer })

    console.log('uploaded file to subject')
  }
}
