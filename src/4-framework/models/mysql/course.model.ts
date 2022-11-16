import { BelongsTo, Column, ForeignKey, HasMany, Table } from 'sequelize-typescript'
import { BaseModel } from '#framework/models/mysql/baseModel'
import { ICourse } from '#domain/entities/iCourse'
import Institution from '#framework/models/mysql/institution.model'
import Subject from '#framework/models/mysql/subject.model'

@Table
export default class Course extends BaseModel<Course> implements ICourse {
  @ForeignKey(() => Institution)
  @Column
  institutionId!: number

  @Column
  courseName!: string

  @Column
  courseDescription!: string

  @BelongsTo(() => Institution)
  institution?: Institution

  @HasMany(() => Subject)
  subjects?: Subject[]
}
