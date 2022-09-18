import { IBaseEntity } from '#domain/entities/iBaseEntity'

export interface IUploadedFile extends IBaseEntity {
  subjectId: number
  fileName: string
  extension: string
  professorId: number
  downloadUrl: string
}
