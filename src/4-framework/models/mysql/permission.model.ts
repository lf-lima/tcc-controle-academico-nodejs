import { Table, Column, BelongsToMany } from 'sequelize-typescript'
import { BaseModel } from '#framework/models/mysql/baseModel'
import Profile from '#framework/models/mysql/profile.model'
import ProfilePermission from '#framework/models/mysql/profilePermission.model'

@Table
export default class Permission extends BaseModel<Permission> {
  @Column
  name!: string

  @Column
  description!: string

  @BelongsToMany(() => Profile, () => ProfilePermission)
  profiles!: Profile[]
}
