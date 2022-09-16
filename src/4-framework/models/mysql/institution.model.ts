import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript'
import { BaseModel } from '#framework/models/mysql/baseModel'
import { IInstitution } from '#domain/entities/iInstitution'
import User from '#framework/models/mysql/user.model'

@Table
export default class Institution extends BaseModel<Institution> implements IInstitution {
  @Column
  name!: string

  @Column
  about!: string

  @ForeignKey(() => User)
  @Column
  userId!: number

  @BelongsTo(() => User)
  user?: User
}
