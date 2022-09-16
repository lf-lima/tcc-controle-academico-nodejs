import { IMainRouter } from '#framework/routers/base/iMainRouter'

export interface IBaseServer<TRouter> {
  app: any,
  mainRouter: IMainRouter<TRouter>
  connection(): void
  routes(): void
  middlewares(): void
  database (): Promise<void>
}
