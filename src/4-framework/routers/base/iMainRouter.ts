import { IBaseRouter } from '#framework/routers/base/iBaseRouter'

export interface IMainRouter<TRouter> {
  router: TRouter
  routers: IBaseRouter<TRouter>[]
  routing(): void
}
