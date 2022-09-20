import { PartialBy } from '#business/utils/partialBy'
import UploadedFile from '#framework/models/mysql/uploadedFile.model'
import { IUploadedFile } from '#domain/entities/iUploadedFile'
import { IUploadedFileRepository } from '#business/repositories/iUploadedFileRepository'

export class UploadedFileRepository implements IUploadedFileRepository {
  private readonly repo: typeof UploadedFile = UploadedFile

  async create (data: PartialBy<IUploadedFile, 'id'>): Promise<IUploadedFile> {
    return await this.repo.create(data as UploadedFile)
  }

  async findById (uploadedFileId: number): Promise<IUploadedFile | undefined> {
    return await this.repo.findByPk(uploadedFileId) as IUploadedFile
  }
}
