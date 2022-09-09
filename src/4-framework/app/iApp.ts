import { IBaseServer } from '../server/base/iBaseServer'
import { IDBConnection } from '../database/base/iConnection'

export interface IApp<TRouter, TDBConfig> {
  server: IBaseServer<TRouter>,
  dbConnection: IDBConnection<TDBConfig>
  database(): Promise<void>
}
