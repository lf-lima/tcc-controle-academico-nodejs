import { IUser } from '#domain/entities/iUser'
import { IFindAllUsersUseCase } from '#business/useCases/user/findAllUsersUseCase'
import { IHttpResponseError } from '#gateway/modules/errors/http/httpResponseErrors'
import { IHttpRequest } from '#gateway/modules/http/httpRequest'
import { HttpInternalErrorResponse, HttpSuccessResponse, IHttpResponse } from '#gateway/modules/http/httpResponse'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'

export type IFindAllUsersOperation = IBaseOperation<null, IUser[]>

export class FindAllUsersOperation implements IFindAllUsersOperation {
  private findAllUsersUseCase!: IFindAllUsersUseCase

  constructor (findAllUsersUseCase: IFindAllUsersUseCase) {
    this.findAllUsersUseCase = findAllUsersUseCase
  }

  async run (httpRequest: IHttpRequest<null>): Promise<IHttpResponse<IUser[] | IHttpResponseError[]>> {
    try {
      return new HttpSuccessResponse(await this.findAllUsersUseCase.run())
    } catch (error: any) {
      return new HttpInternalErrorResponse(error.message)
    }
  }
}
