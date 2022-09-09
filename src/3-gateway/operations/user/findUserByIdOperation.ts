import { IUser } from '../../../1-domain/entities/iUser'
import { FindUserByIdDTO } from '../../../2-business/dto/user'
import { IFindUserByIdUseCase } from '../../../2-business/useCases/user/findUserByIdUseCase'
import { IHttpResponseError } from '../../modules/errors/http/httpReponseErrors'
import { IHttpRequest } from '../../modules/http/httpRequest'
import { HttpBadRequestResponse, HttpInternalErrorResponse, HttpSuccessResponse, IHttpResponse } from '../../modules/http/httpResponse'
import { IInputFindUserById, InputFindUserById } from '../../serializers/user/inputFindUserById'
import { IBaseOperation } from '../base/iBaseOperation'

export type IFindUserByIdOperation = IBaseOperation<IInputFindUserById, IUser>

export class FindUserByIdOperation implements IFindUserByIdOperation {
  private findUserByIdUseCase!: IFindUserByIdUseCase

  constructor (findUserByIdUseCase: IFindUserByIdUseCase) {
    this.findUserByIdUseCase = findUserByIdUseCase
  }

  async run (httpRequest: IHttpRequest<IInputFindUserById>): Promise<IHttpResponse<IUser | IHttpResponseError[]>> {
    try {
      httpRequest.body.userId = Number(httpRequest.body.userId)

      const inputFindUserById = new InputFindUserById(httpRequest.body)

      const errors = await inputFindUserById.validate()

      if (inputFindUserById.hasError) {
        return new HttpBadRequestResponse(errors)
      }

      const dto = new FindUserByIdDTO(httpRequest.body)

      const user = await this.findUserByIdUseCase.run(dto)

      if (!user) {
        return new HttpBadRequestResponse([{
          property: 'user',
          messages: [
            'User not Exists in System'
          ]
        }])
      }

      return new HttpSuccessResponse(user)
    } catch (error: any) {
      return new HttpInternalErrorResponse(error.message)
    }
  }
}
