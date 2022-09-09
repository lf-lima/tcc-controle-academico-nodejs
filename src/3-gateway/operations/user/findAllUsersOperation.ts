import { IUser } from '../../../1-domain/entities/iUser'
import { IFindAllUsersUseCase } from '../../../2-business/useCases/user/findAllUsersUseCase'
import { IHttpResponseError } from '../../modules/errors/http/httpReponseErrors'
import { IHttpRequest } from '../../modules/http/httpRequest'
import { HttpInternalErrorResponse, HttpSuccessResponse, IHttpResponse } from '../../modules/http/httpResponse'
import { IBaseOperation } from '../base/iBaseOperation'

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
