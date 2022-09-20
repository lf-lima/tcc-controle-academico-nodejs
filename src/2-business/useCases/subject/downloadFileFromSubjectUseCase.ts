import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { IFileStorageService } from '#business/services/iFileStorageService'
import { IUploadedFileRepository } from '#business/repositories/iUploadedFileRepository'
import { DownloadFileFromSubjectInputDto } from '#business/dto/subject/downloadFileFromSubjectInputDto'

export class DownloadFileFromSubjectUseCase implements IBaseUseCase<DownloadFileFromSubjectInputDto, string> {
  private uploadedFileToRepository!: IUploadedFileRepository
  private fileStorageService!: IFileStorageService

  constructor (
    uploadedFileToRepository: IUploadedFileRepository,
    fileStorageService: IFileStorageService
  ) {
    this.uploadedFileToRepository = uploadedFileToRepository
    this.fileStorageService = fileStorageService
  }

  async run (input: DownloadFileFromSubjectInputDto): Promise<string> {
    console.log('start download file of subject use case: ', input)

    const { uploadedFileId } = input

    const uploadedFile = await this.uploadedFileToRepository.findById(uploadedFileId)

    if (!uploadedFile) {
      console.error(`file don't exists`)
      throw new Error(`File don't exists`)
    }

    console.log('uploaded file found: ', uploadedFile)

    const { fileName, extension } = uploadedFile

    const fileKey = `${fileName}_${uploadedFileId}.${extension}`

    const downloadUrl = await this.fileStorageService.getObjectUrl(fileKey)

    console.log('success get download url')

    return downloadUrl
  }
}
