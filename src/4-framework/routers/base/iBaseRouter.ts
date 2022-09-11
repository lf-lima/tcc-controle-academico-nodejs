import { IBaseOperationAdapter } from '#gateway/adapters/operation/baseOperationAdapter'

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
