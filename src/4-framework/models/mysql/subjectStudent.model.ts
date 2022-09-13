import { Table, Column, ForeignKey } from 'sequelize-typescript'
import { BaseModel } from '#framework/models/mysql/baseModel'
import Subject from '#framework/models/mysql/subject.model'
import Student from '#framework/models/mysql/student.model'

@Table
export default class SubjectStudent extends BaseModel<SubjectStudent> {
  @ForeignKey(() => Subject)
  @Column
  subjectId!: number

  @ForeignKey(() => Student)
  @Column
  studentId!: number
}
