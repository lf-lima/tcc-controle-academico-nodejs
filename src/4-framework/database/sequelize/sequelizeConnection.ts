import { Sequelize } from 'sequelize-typescript'
import { ISequelizeDBConfig } from '#framework/database/sequelize/sequelizeConfig'
import { IDBConnection } from '#framework/database/base/iConnection'

export type ISequelizeConnection = IDBConnection<ISequelizeDBConfig>

export class SequelizeConnection implements ISequelizeConnection {
  public config: ISequelizeDBConfig

  constructor (config: ISequelizeDBConfig) {
    this.config = config
  }

  public async connect (): Promise<void> {
    const sequelize = new Sequelize(this.config.options)

    await sequelize.sync({ force: true })
  }
}
