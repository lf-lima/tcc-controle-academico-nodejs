import { IHttpResponse } from '#gateway/modules/http/httpResponse'

export interface IBaseOperation<TInput = any, TResponse = any> {
  run(input?: TInput): Promise<IHttpResponse<TResponse>>
}
