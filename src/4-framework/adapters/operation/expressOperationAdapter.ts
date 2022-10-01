import { Response } from 'express'
import { BaseInputAdapt, IBaseOperationAdapter } from '#framework/adapters/operation/baseOperationAdapter'
import { IBaseEntity } from '#domain/entities/iBaseEntity'
import { HttpRequest } from '#gateway/modules/http/httpRequest'
import { HttpBadRequestResponse, IHttpResponse } from '#gateway/modules/http/httpResponse'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'
import { InputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'
import { TokenPayload } from '#domain/models/token'

export class ExpressOperationAdapter implements IBaseOperationAdapter {
  private operation!: IBaseOperation

  constructor (operation: IBaseOperation) {
    this.operation = operation
  }

  adapt ({ Input = InputBaseValidator, inputNormalizer }: BaseInputAdapt) {
    return async (req: any, res: Response): Promise<Response<IHttpResponse<IBaseEntity>>> => {
      const reqFile: { file?: any, files?: any } = {}
      const tokenPayload: { tokenPayload?: TokenPayload } = {}

      console.log('EXPRESS REQUEST: ', req)
      if (req.file) {
        reqFile.file = req.file
      }

      if (req.files) {
        reqFile.files = req.files
      }

      if (req.tokenPayload) {
        tokenPayload.tokenPayload = req.tokenPayload
      }

      const httpRequest = new HttpRequest({ body: { ...req.body, ...req.params, ...reqFile, ...tokenPayload } })

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
