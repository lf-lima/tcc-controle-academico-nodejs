import { Column, Table } from 'sequelize-typescript'
import { IUser } from '../../../1-domain/entities/iUser'
import BaseModel from './baseModel'

@Table
export default class User extends BaseModel<User> implements IUser {
  @Column
  email!: string

  @Column
  password!: string
}
