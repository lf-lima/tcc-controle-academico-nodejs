import { Table, Column, ForeignKey } from 'sequelize-typescript'
import { BaseModel } from '#framework/models/mysql/baseModel'
import Profile from '#framework/models/mysql/profile.model'
import Permission from '#framework/models/mysql/permission.model'

@Table
export default class ProfilePermission extends BaseModel<ProfilePermission> {
  @ForeignKey(() => Profile)
  @Column
  profileId!: number

  @ForeignKey(() => Permission)
  @Column
  permissionId!: number
}
