import { IHttpRequest } from '../../modules/http/httpRequest'
import { IHttpResponse } from '../../modules/http/httpResponse'
import { IHttpResponseError } from '../../modules/errors/http/httpReponseErrors'

export interface IBaseOperation<IInput, TReponse> {
  run(httpRequest: IHttpRequest<IInput>): Promise<IHttpResponse<TReponse | IHttpResponseError[]>>
}
