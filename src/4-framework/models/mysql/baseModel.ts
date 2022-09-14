import { Column, CreatedAt, Model, UpdatedAt } from 'sequelize-typescript'
import { IBaseEntity } from '#domain/entities/iBaseEntity'

export class BaseModel<TModel extends {}> extends Model<TModel> implements IBaseEntity {
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
