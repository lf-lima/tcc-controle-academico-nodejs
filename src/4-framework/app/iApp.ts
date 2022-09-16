import { IBaseServer } from '#framework/server/base/iBaseServer'

export interface IApp<TRouter> {
  server: IBaseServer<TRouter>
}
