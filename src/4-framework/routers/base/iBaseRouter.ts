import { IHttpRequest } from '#gateway/modules/http/httpRequest'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'
import { IInputBaseValidator, InputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'

export type InputNormalizer = (httpRequest: IHttpRequest) => InputBaseValidator

export interface IRoute {
  routeName: string
  method: 'get' | 'post' | 'delete' | 'put'
  routePath: string
  input?: IInputBaseValidator
  inputNormalizer?: InputNormalizer
  operation: IBaseOperation
  permissions?: string[]
  options?: {
    uploadFileMiddleware?: boolean
  }
}

export interface IBaseRouter<TRouter> {
  router: TRouter
  baseRoute: string
  routes: IRoute[]
}
