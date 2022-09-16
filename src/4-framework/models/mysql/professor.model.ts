import { BelongsTo, Column, ForeignKey, HasMany, Table } from 'sequelize-typescript'
import { BaseModel } from '#framework/models/mysql/baseModel'
import User from '#framework/models/mysql/user.model'
import Institution from '#framework/models/mysql/institution.model'
import { IProfessor } from '#domain/entities/iProfessor'
import Subject from '#framework/models/mysql/subject.model'

@Table
export default class Professor extends BaseModel<Professor> implements IProfessor {
  @ForeignKey(() => Institution)
  @Column
  institutionId!: number

  @ForeignKey(() => User)
  @Column
  userId!: number

  @Column
  name!: string

  @BelongsTo(() => User)
  user?: User

  @BelongsTo(() => Institution)
  institution?: Institution

  @HasMany(() => Subject)
  subject?: Subject
}
