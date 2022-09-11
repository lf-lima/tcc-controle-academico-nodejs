import { DeleteUserDTO } from '#business/dto/user'
import { IDeleteUserUseCase } from '#business/useCases/user/deleteUserUseCase'
import { IFindUserByIdUseCase } from '#business/useCases/user/findUserByIdUseCase'
import { IHttpResponseError } from '#gateway/modules/errors/http/httpResponseErrors'
import { IHttpRequest } from '#gateway/modules/http/httpRequest'
import { HttpBadRequestResponse, HttpInternalErrorResponse, HttpSuccessResponse, IHttpResponse } from '#gateway/modules/http/httpResponse'
import { IInputDeleteUser, InputDeleteUser } from '#gateway/serializers/user/inputDeleteUser'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'

export type IDeleteUserOperation = IBaseOperation<IInputDeleteUser, string>

export class DeleteUserOperation implements IDeleteUserOperation {
  private deleteUserUseCase!: IDeleteUserUseCase
  private findUserByIdUseCase!: IFindUserByIdUseCase

  constructor (deleteUserUseCase: IDeleteUserUseCase, findUserByIdUseCase: IFindUserByIdUseCase) {
    this.deleteUserUseCase = deleteUserUseCase
    this.findUserByIdUseCase = findUserByIdUseCase
  }

  async run (httpRequest: IHttpRequest<IInputDeleteUser>): Promise<IHttpResponse<string | IHttpResponseError[]>> {
    try {
      httpRequest.body.userId = Number(httpRequest.body.userId)

      const inputDeleteUser = new InputDeleteUser(httpRequest.body)

      const errors = await inputDeleteUser.validate()

      if (inputDeleteUser.hasError) {
        return new HttpBadRequestResponse(errors)
      }

      const dto = new DeleteUserDTO(httpRequest.body)

      const user = await this.findUserByIdUseCase.run(dto)

      if (!user) {
        return new HttpBadRequestResponse([{
          property: 'user',
          messages: [
            'User not Exists in System'
          ]
        }])
      }

      await this.deleteUserUseCase.run(dto)

      return new HttpSuccessResponse('User Deleted')
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
