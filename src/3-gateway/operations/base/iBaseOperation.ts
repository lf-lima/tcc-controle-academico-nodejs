import { IHttpResponse } from '#gateway/modules/http/httpResponse'

export interface IBaseOperation<TInput, TResponse> {
  run(input?: TInput): Promise<IHttpResponse<TResponse>>
}
