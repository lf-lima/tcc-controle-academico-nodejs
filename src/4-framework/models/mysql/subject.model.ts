import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript'
import { BaseModel } from '#framework/models/mysql/baseModel'
import Institution from '#framework/models/mysql/institution.model'
import { ISubject } from '#domain/entities/iSubject'
import Course from '#framework/models/mysql/course.model'
import Professor from '#framework/models/mysql/professor.model'

@Table
export default class Subject extends BaseModel<Subject> implements ISubject {
  @ForeignKey(() => Institution)
  @Column
  institutionId!: number

  @ForeignKey(() => Course)
  @Column
  courseId!: number

  @ForeignKey(() => Professor)
  @Column
  professorId!: number

  @Column
  subjectName!: string

  @Column
  subjectDescription!: string

  @BelongsTo(() => Institution)
  institution?: Institution

  @BelongsTo(() => Professor)
  professor?: Professor

  @BelongsTo(() => Course)
  course?: Course
}
