import { IApp } from './iApp'
import { IBaseServer } from '../server/base/iBaseServer'
import { IDBConnection } from '../database/base/iConnection'

export class App<TRouter, TDBConfig> implements IApp<TRouter, TDBConfig> {
  public server: IBaseServer<TRouter>
  public dbConnection: IDBConnection<TDBConfig>

  constructor (server: IBaseServer<TRouter>, dbConnection: IDBConnection<TDBConfig>) {
    this.server = server
    this.dbConnection = dbConnection
    this.database()
  }

  async database (): Promise<void> {
    await this.dbConnection.connect()
  }
}
