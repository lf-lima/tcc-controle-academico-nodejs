import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript'
import { IUser } from '#domain/entities/iUser'
import { BaseModel } from '#framework/models/mysql/baseModel'
import Profile from '#framework/models/mysql/profile.model'

@Table
export default class User extends BaseModel<User> implements IUser {
  @Column
  password!: string

  @ForeignKey(() => Profile)
  @Column
  profileId!: number

  @BelongsTo(() => Profile)
  profile?: Profile
}
