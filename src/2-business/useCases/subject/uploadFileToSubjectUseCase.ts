import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { ISubjectRepository } from '#business/repositories/iSubjectRepository'
import { UploadFileToSubjectInputDto } from '#business/dto/subject/uploadFileToSubjectInputDto'
import { IUploadFileService } from '#business/services/iUploadFileService'

export class UploadFileToSubjectUseCase implements IBaseUseCase<UploadFileToSubjectInputDto, void> {
  private subjectRepository!: ISubjectRepository
  private uploadService!: IUploadFileService

  constructor (subjectRepository: ISubjectRepository, uploadService: IUploadFileService) {
    this.subjectRepository = subjectRepository
    this.uploadService = uploadService
  }

  async run (input: UploadFileToSubjectInputDto): Promise<void> {
    console.log('start upload file to subject use case: ', input)

    const { fileName, subjectId, fileBuffer } = input

    const subject = await this.subjectRepository.findById(subjectId)

    console.log('subject found: ', subject)

    await this.uploadService.upload({ fileName, fileBuffer })

    console.log('uploaded file to subject')
  }
}
