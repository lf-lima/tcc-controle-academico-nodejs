import { Column, Table } from 'sequelize-typescript'
import { IUser } from '#domain/entities/iUser'
import BaseModel from '#framework/models/mysql/baseModel'

@Table
export default class User extends BaseModel<User> implements IUser {
  @Column
  email!: string

  @Column
  password!: string
}
