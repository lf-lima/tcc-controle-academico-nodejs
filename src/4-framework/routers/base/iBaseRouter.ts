import { IBaseOperationAdapter } from '#framework/adapters/operation/baseOperationAdapter'
import { IHttpRequest } from '#gateway/modules/http/httpRequest'
import { IInputBaseValidator, InputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'

export type InputNormalizer = (httpRequest: IHttpRequest) => InputBaseValidator

export interface IRoute {
  method: 'get' | 'post' | 'delete' | 'put'
  routePath: string
  input?: IInputBaseValidator
  inputNormalizer?: InputNormalizer
  operationAdapter: IBaseOperationAdapter
}

export interface IBaseRouter<TRouter> {
  router: TRouter
  baseRoute: string
  routes: IRoute[]
}
