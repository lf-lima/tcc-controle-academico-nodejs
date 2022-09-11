import { Request, Response } from 'express'
import { IHttpResponseError } from '#gateway/modules/errors/http/httpResponseErrors'
import { IBaseOperationAdapter } from '#gateway/adapters/operation/baseOperationAdapter'
import { IBaseEntity } from '#domain/entities/iBaseEntity'
import { HttpRequest } from '#gateway/modules/http/httpRequest'
import { IHttpResponse } from '#gateway/modules/http/httpResponse'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'

export class ExpressOperationAdapter<IInput, TReturnUseCase> implements IBaseOperationAdapter {
  private operation!: IBaseOperation<IInput, TReturnUseCase>

  constructor (operation: IBaseOperation<IInput, TReturnUseCase>) {
    this.operation = operation
  }

  adapt () {
    return async (req: Request, res: Response): Promise<Response<IHttpResponse<IBaseEntity | IHttpResponseError[]>>> => {
      const httpRequest = new HttpRequest({ body: { ...req.body, ...req.params } })
      const httpResponse = await this.operation.run(httpRequest)

      return res.status(httpResponse.statusCode).json(httpResponse)
    }
  }
}
