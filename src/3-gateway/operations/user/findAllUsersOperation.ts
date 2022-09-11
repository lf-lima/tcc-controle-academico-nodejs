import { IUser } from '#domain/entities/iUser'
import { IFindAllUsersUseCase } from '#business/useCases/user/findAllUsersUseCase'
import { IHttpResponseError } from '#gateway/modules/errors/http/httpResponseErrors'
import { HttpInternalErrorResponse, HttpOkResponse, IHttpResponse } from '#gateway/modules/http/httpResponse'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'

export type IFindAllUsersOperation = IBaseOperation<any, IUser[]>

export class FindAllUsersOperation implements IFindAllUsersOperation {
  private findAllUsersUseCase!: IFindAllUsersUseCase

  constructor (findAllUsersUseCase: IFindAllUsersUseCase) {
    this.findAllUsersUseCase = findAllUsersUseCase
  }

  async run (): Promise<IHttpResponse<IUser[] | IHttpResponseError[]>> {
    try {
      return new HttpOkResponse(await this.findAllUsersUseCase.run())
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
