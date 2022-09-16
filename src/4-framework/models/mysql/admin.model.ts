import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript'
import { BaseModel } from '#framework/models/mysql/baseModel'
import { IAdmin } from '#domain/entities/iAdmin'
import User from '#framework/models/mysql/user.model'

@Table
export default class Admin extends BaseModel<Admin> implements IAdmin {
  @Column
  name!: string

  @ForeignKey(() => User)
  @Column
  userId!: number

  @BelongsTo(() => User)
  user?: User
}
