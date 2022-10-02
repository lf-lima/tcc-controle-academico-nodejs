import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { IFileStorageService } from '#business/services/iFileStorageService'
import { IUploadedFileRepository } from '#business/repositories/iUploadedFileRepository'

export class DeleteUploadedFileUseCase implements IBaseUseCase<number, void> {
  private uploadedFileToRepository!: IUploadedFileRepository
  private fileStorageService!: IFileStorageService

  constructor (
    uploadedFileToRepository: IUploadedFileRepository,
    fileStorageService: IFileStorageService
  ) {
    this.uploadedFileToRepository = uploadedFileToRepository
    this.fileStorageService = fileStorageService
  }

  async run (uploadedFileId: number): Promise<void> {
    console.log('start delete uploaded file use case: ', uploadedFileId)

    const uploadedFile = await this.uploadedFileToRepository.findById(uploadedFileId)

    if (!uploadedFile) {
      console.error(`file don't exists`)
      throw new Error(`File don't exists`)
    }

    console.log('uploaded file found: ', uploadedFile)

    const { fileName, extension } = uploadedFile

    const fileKey = `${fileName}_${uploadedFileId}.${extension}`

    await this.fileStorageService.deleteObject(fileKey)

    await this.uploadedFileToRepository.deleteById(uploadedFileId)

    console.log('success delete uploaded file')
  }
}
