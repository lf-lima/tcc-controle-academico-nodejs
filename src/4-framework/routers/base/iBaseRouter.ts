import { IBaseOperationAdapter } from '#gateway/operations/adapter/baseAdapter'

export interface IRoute {
  method: 'get' | 'post' | 'delete' | 'put'
  routePath: string
  operationAdapter: IBaseOperationAdapter
}

export interface IBaseRouter<TRouter> {
  router: TRouter
  baseRoute: string
  routes: IRoute[]
}
