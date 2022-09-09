import { IBaseRouter } from '../base/iBaseRouter'

export interface IMainRouter<TRouter> {
  router: TRouter
  routers: IBaseRouter<TRouter>[]
  routing(): void
}
