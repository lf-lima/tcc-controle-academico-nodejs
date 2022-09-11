import { Request, Response } from 'express'
import { IHttpResponseError } from '#gateway/modules/errors/http/httpResponseErrors'
import { IBaseOperationAdapter } from '#gateway/adapters/operation/baseOperationAdapter'
import { IBaseEntity } from '#domain/entities/iBaseEntity'
import { HttpRequest } from '#gateway/modules/http/httpRequest'
import { HttpBadRequestResponse, IHttpResponse } from '#gateway/modules/http/httpResponse'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'
import { IInputBaseValidator, InputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'

export class ExpressOperationAdapter implements IBaseOperationAdapter {
  private operation!: IBaseOperation<any, any>

  constructor (operation: IBaseOperation<any, any>) {
    this.operation = operation
  }

  adapt (Input: IInputBaseValidator = InputBaseValidator) {
    return async (req: Request, res: Response): Promise<Response<IHttpResponse<IBaseEntity | IHttpResponseError[]>>> => {
      const httpRequest = new HttpRequest({ body: { ...req.body, ...req.params } })

      let httpResponse: IHttpResponse<any | IHttpResponseError[]>

      const input = new Input(httpRequest.body)

      const errors = await input.validate()

      if (input.hasError) {
        httpResponse = new HttpBadRequestResponse(errors)
      } else {
        httpResponse = await this.operation.run(input)
      }

      return res.status(httpResponse.statusCode).json(httpResponse)
    }
  }
}
