import { IBaseEntity } from '../../../1-domain/entities/iBaseEntity'
import { Column, CreatedAt, Model, UpdatedAt } from 'sequelize-typescript'

export default class BaseModel<TModel> extends Model<TModel> implements IBaseEntity {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  })
  id!: number

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
