import { IApp } from '#framework/app/iApp'
import { IBaseServer } from '#framework/server/base/iBaseServer'

export class App implements IApp {
  public server: IBaseServer

  constructor (server: IBaseServer) {
    this.server = server
  }
}
