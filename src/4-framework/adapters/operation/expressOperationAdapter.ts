import { Request, Response } from 'express'
import { BaseInputAdapt, IBaseOperationAdapter } from '#framework/adapters/operation/baseOperationAdapter'
import { IBaseEntity } from '#domain/entities/iBaseEntity'
import { HttpRequest } from '#gateway/modules/http/httpRequest'
import { HttpBadRequestResponse, IHttpResponse } from '#gateway/modules/http/httpResponse'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'
import { InputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'

export class ExpressOperationAdapter implements IBaseOperationAdapter {
  private operation!: IBaseOperation

  constructor (operation: IBaseOperation) {
    this.operation = operation
  }

  adapt ({ Input = InputBaseValidator, inputNormalizer }: BaseInputAdapt) {
    return async (req: Request, res: Response): Promise<Response<IHttpResponse<IBaseEntity>>> => {
      const reqFile: { file?: any, files?: any } = {}

      if (req.file) {
        reqFile.file = req.file
      }

      if (req.files) {
        reqFile.files = req.files
      }

      const httpRequest = new HttpRequest({ body: { ...req.body, ...req.params, ...reqFile } })

      let input: InputBaseValidator

      if (inputNormalizer) {
        input = inputNormalizer(httpRequest)
      } else {
        input = new Input(httpRequest.body)
      }

      const errors = await input.validate()

      let httpResponse: IHttpResponse<any>

      if (input.hasError) {
        httpResponse = new HttpBadRequestResponse(errors)
      } else {
        httpResponse = await this.operation.run(input)
      }

      return res.status(httpResponse.statusCode).json(httpResponse)
    }
  }
}
