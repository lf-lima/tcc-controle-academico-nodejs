import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript'
import { BaseModel } from '#framework/models/mysql/baseModel'
import { IUploadedFile } from '#domain/entities/iUploadedFile'
import Subject from '#framework/models/mysql/subject.model'
import Professor from '#framework/models/mysql/professor.model'

@Table
export default class UploadedFile extends BaseModel<UploadedFile> implements IUploadedFile {
  @ForeignKey(() => Subject)
  @Column
  subjectId!: number

  @Column
  fileName!: string

  @Column
  extension!: string

  @ForeignKey(() => Professor)
  @Column
  professorId!: number

  // @BelongsTo(() => Subject)
  // subject?: Subject

  @BelongsTo(() => Professor)
  professor?: Professor
}
