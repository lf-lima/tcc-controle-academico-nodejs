import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { ISubjectRepository } from '#business/repositories/iSubjectRepository'
import { UploadFileToSubjectInputDto } from '#business/dto/subject/uploadFileToSubjectInputDto'
import { IUploadFileService } from '#business/services/iUploadFileService'
import { IUploadedFileRepository } from '#business/repositories/iUploadedFileRepository'

export class UploadFileToSubjectUseCase implements IBaseUseCase<UploadFileToSubjectInputDto, void> {
  private subjectRepository!: ISubjectRepository
  private uploadedFileToRepository!: IUploadedFileRepository
  private uploadService!: IUploadFileService

  constructor (
    subjectRepository: ISubjectRepository,
    uploadedFileToRepository: IUploadedFileRepository,
    uploadService: IUploadFileService
  ) {
    this.subjectRepository = subjectRepository
    this.uploadedFileToRepository = uploadedFileToRepository
    this.uploadService = uploadService
  }

  async run (input: UploadFileToSubjectInputDto): Promise<void> {
    console.log('start upload file to subject use case: ', input)

    const { fileName, subjectId, fileBuffer, professorId } = input

    const subject = await this.subjectRepository.findById(subjectId)

    console.log('subject found: ', subject)

    const downloadUrl = await this.uploadService.upload({ fileName, fileBuffer })

    const [,fileExtension] = fileName.split('.')

    await this.uploadedFileToRepository.create({ subjectId, professorId, downloadUrl, extension: fileExtension, fileName })

    console.log('uploaded file to subject')
  }
}
