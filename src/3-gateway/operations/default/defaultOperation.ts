import { IHttpRequest } from '#gateway/modules/http/httpRequest'
import { HttpInternalErrorResponse, HttpSuccessResponse, IHttpResponse } from '#gateway/modules/http/httpResponse'
import { IHttpResponseError } from '#gateway/modules/errors/http/httpResponseErrors'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'

export class DefaultOperation implements IBaseOperation<{ test: string }, { success: boolean }> {
  async run (httpRequest: IHttpRequest<{ test: string }>): Promise<IHttpResponse<{ success: boolean } | IHttpResponseError[]>> {
    try {
      return new HttpSuccessResponse({
        success: true
      })
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
