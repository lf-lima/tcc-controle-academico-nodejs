import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { UploadFileToSubjectInputDto } from '#business/dto/subject/uploadFileToSubjectInputDto'
import { IFileStorageService } from '#business/services/iFileStorageService'
import { IUploadedFileRepository } from '#business/repositories/iUploadedFileRepository'

export class UploadFileToSubjectUseCase implements IBaseUseCase<UploadFileToSubjectInputDto, void> {
  private uploadedFileToRepository!: IUploadedFileRepository
  private fileStorageService!: IFileStorageService

  constructor (
    uploadedFileToRepository: IUploadedFileRepository,
    fileStorageService: IFileStorageService
  ) {
    this.uploadedFileToRepository = uploadedFileToRepository
    this.fileStorageService = fileStorageService
  }

  async run (input: UploadFileToSubjectInputDto): Promise<void> {
    console.log('start upload file to subject use case: ', input)

    const { fileName: fileNameWithExtension, subjectId, fileBuffer, professorId } = input
    const [fileName, fileExtension] = fileNameWithExtension.split('.')

    const { id: uploadedFileId } = await this.uploadedFileToRepository.create({ subjectId, professorId, extension: fileExtension, fileName })

    const newFileName = `${fileName}_${uploadedFileId}.${fileExtension}`

    await this.fileStorageService.upload({ fileName: newFileName, fileExtension, fileBuffer })

    console.log('uploaded file to subject')
  }
}
