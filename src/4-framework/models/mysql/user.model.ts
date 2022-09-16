import { BeforeCreate, BeforeUpdate, BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript'
import { IUser } from '#domain/entities/iUser'
import { BaseModel } from '#framework/models/mysql/baseModel'
import Profile from '#framework/models/mysql/profile.model'
import bcrypt from 'bcrypt'

@Table
export default class User extends BaseModel<User> implements IUser {
  @Column
  documentNumber!: string

  @Column
  password!: string

  @ForeignKey(() => Profile)
  @Column
  profileId!: number

  @BelongsTo(() => Profile)
  profile?: Profile

  @BeforeCreate
  @BeforeUpdate({ name: 'password' })
  static async hashPassword (instance: User): Promise<void> {
    instance.password = await bcrypt.hash(instance.password, 10)
  }
}
