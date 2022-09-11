import { IHttpRequest } from '#gateway/modules/http/httpRequest'
import { IHttpResponse } from '#gateway/modules/http/httpResponse'
import { IHttpResponseError } from '#gateway/modules/errors/http/httpResponseErrors'

export interface IBaseOperation<IInput, TResponse> {
  run(httpRequest: IHttpRequest<IInput>): Promise<IHttpResponse<TResponse | IHttpResponseError[]>>
}
