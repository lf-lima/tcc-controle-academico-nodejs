import { Column, CreatedAt, Model, UpdatedAt } from 'sequelize-typescript'
import { IBaseEntity } from '#domain/entities/iBaseEntity'

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
