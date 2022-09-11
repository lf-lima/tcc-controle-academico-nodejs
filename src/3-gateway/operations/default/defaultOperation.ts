import { HttpInternalErrorResponse, HttpOkResponse, IHttpResponse } from '#gateway/modules/http/httpResponse'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'

export class DefaultOperation implements IBaseOperation<{ test: string }, { success: boolean }> {
  async run (): Promise<IHttpResponse<{ success: boolean }>> {
    try {
      return new HttpOkResponse({
        success: true
      })
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
