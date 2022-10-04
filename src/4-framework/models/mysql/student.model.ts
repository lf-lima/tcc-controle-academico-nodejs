import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript'
import { BaseModel } from '#framework/models/mysql/baseModel'
import User from '#framework/models/mysql/user.model'
import { IStudent } from '#domain/entities/iStudent'
import Institution from '#framework/models/mysql/institution.model'
import Course from '#framework/models/mysql/course.model'

@Table
export default class Student extends BaseModel<Student> implements IStudent {
  @ForeignKey(() => Institution)
  @Column
  institutionId!: number

  @ForeignKey(() => User)
  @Column
  userId!: number

  @ForeignKey(() => Course)
  @Column
  courseId!: number

  @Column
  name!: string

  @BelongsTo(() => User)
  user?: User

  @BelongsTo(() => Course)
  course?: Course

  @BelongsTo(() => Institution)
  institution?: Institution
}
