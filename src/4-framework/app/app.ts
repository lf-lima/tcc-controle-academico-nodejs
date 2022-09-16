import { IApp } from '#framework/app/iApp'
import { IBaseServer } from '#framework/server/base/iBaseServer'

export class App<TRouter> implements IApp<TRouter> {
  public server: IBaseServer<TRouter>

  constructor (server: IBaseServer<TRouter>) {
    this.server = server
  }
}
