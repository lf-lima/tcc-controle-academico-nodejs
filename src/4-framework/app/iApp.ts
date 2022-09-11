import { IBaseServer } from '#framework/server/base/iBaseServer'
import { IDBConnection } from '#framework/database/base/iConnection'

export interface IApp<TRouter, TDBConfig> {
  server: IBaseServer<TRouter>,
  dbConnection: IDBConnection<TDBConfig>
  database(): Promise<void>
}
