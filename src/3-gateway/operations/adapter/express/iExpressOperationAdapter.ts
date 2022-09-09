import { Request, Response } from 'express'
import { IBaseEntity } from '../../../../1-domain/entities/iBaseEntity'
import { IHttpResponseError } from '../../../modules/errors/http/httpReponseErrors'
import { HttpRequest } from '../../../modules/http/httpRequest'
import { IHttpResponse } from '../../../modules/http/httpResponse'
import { IBaseOperation } from '../../base/iBaseOperation'

export interface IExpressOperationAdapter<IInput, TReturnUseCase> {
    adapt(operation: IBaseOperation<IInput, TReturnUseCase>):
      (req: Request, res: Response) => Promise<Response<IHttpResponse<IBaseEntity | IHttpResponseError[]>>>
}

export class ExpressOperationAdapter<IInput, TReturnUseCase> implements IExpressOperationAdapter<IInput, TReturnUseCase> {
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
