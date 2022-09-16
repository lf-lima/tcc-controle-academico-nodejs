import { BelongsTo, BelongsToMany, Column, ForeignKey, Table } from 'sequelize-typescript'
import { BaseModel } from '#framework/models/mysql/baseModel'
import User from '#framework/models/mysql/user.model'
import { IStudent } from '#domain/entities/iStudent'
import Institution from '#framework/models/mysql/institution.model'
import Subject from '#framework/models/mysql/subject.model'
import SubjectStudent from '#framework/models/mysql/subjectStudent.model'

@Table
export default class Student extends BaseModel<Student> implements IStudent {
  @ForeignKey(() => Institution)
  @Column
  institutionId!: number

  @ForeignKey(() => User)
  @Column
  userId!: number

  @Column
  name!: string

  @Column
  documentNumber!: string

  @BelongsToMany(() => Subject, () => SubjectStudent)
  subjects?: Subject[]

  @BelongsTo(() => User)
  user?: User

  @BelongsTo(() => Institution)
  institution?: Institution
}
