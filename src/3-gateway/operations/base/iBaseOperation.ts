import { IHttpResponse } from '#gateway/modules/http/httpResponse'
import { IHttpResponseError } from '#gateway/modules/errors/http/httpResponseErrors'

export interface IBaseOperation<TInput, TResponse> {
  run(input?: TInput): Promise<IHttpResponse<TResponse | IHttpResponseError[]>>
}
