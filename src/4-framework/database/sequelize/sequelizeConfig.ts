import { SequelizeOptions } from 'sequelize-typescript'
import { baseSequelizeOptions } from '#framework/const/databaseConfigs'
import { IDBConfig } from '#framework/database/base/iConfig'

export type ISequelizeDBConfig = IDBConfig<SequelizeOptions>

class SequelizeDBConfig implements ISequelizeDBConfig {
  public options = baseSequelizeOptions
}

export class SequelizeMysqlConfig extends SequelizeDBConfig {
  constructor () {
    super()
    this.options.dialect = 'mysql'
  }
}
