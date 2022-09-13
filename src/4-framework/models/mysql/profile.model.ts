import { Table, Column, BelongsToMany, HasMany, DefaultScope } from 'sequelize-typescript'
import { BaseModel } from '#framework/models/mysql/baseModel'
import Permission from '#framework/models/mysql/permission.model'
import ProfilePermission from '#framework/models/mysql/profilePermission.model'
import User from '#framework/models/mysql/user.model'

@DefaultScope(() => ({
  attributes: { exclude: ['createdAt', 'updatedAt'] },
  include: [{ model: Permission, through: { attributes: [] } }]
}))
@Table
export default class Profile extends BaseModel<Profile> {
  @Column
  name!: string

  @BelongsToMany(() => Permission, () => ProfilePermission)
  permissions?: Permission[]

  @HasMany(() => User)
  users?: User[]
}
