import { PartialBy } from '#business/utils/partialBy'
import { IUploadedFile } from '#domain/entities/iUploadedFile'

export interface IUploadedFileRepository {
  create(data: PartialBy<IUploadedFile, 'id'>): Promise<IUploadedFile>
}
