import { IApp } from '#framework/app/iApp'
import { IBaseServer } from '#framework/server/base/iBaseServer'
import { IDBConnection } from '#framework/database/base/iConnection'

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
