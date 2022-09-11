import { IBaseOperationAdapter } from '#gateway/adapters/operation/baseOperationAdapter'
import { IInputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'

export interface IRoute {
  method: 'get' | 'post' | 'delete' | 'put'
  routePath: string
  input?: IInputBaseValidator
  operationAdapter: IBaseOperationAdapter
}

export interface IBaseRouter<TRouter> {
  router: TRouter
  baseRoute: string
  routes: IRoute[]
}
