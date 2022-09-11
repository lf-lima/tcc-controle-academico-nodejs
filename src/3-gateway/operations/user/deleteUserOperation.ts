import { DeleteUserDTO } from '#business/dto/user'
import { IDeleteUserUseCase } from '#business/useCases/user/deleteUserUseCase'
import { IFindUserByIdUseCase } from '#business/useCases/user/findUserByIdUseCase'
import { HttpBadRequestResponse, HttpInternalErrorResponse, HttpOkResponse, IHttpResponse } from '#gateway/modules/http/httpResponse'
import { InputDeleteUser } from '#gateway/serializers/user/inputDeleteUser'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'

export type IDeleteUserOperation = IBaseOperation<InputDeleteUser, string>

export class DeleteUserOperation implements IDeleteUserOperation {
  private deleteUserUseCase!: IDeleteUserUseCase
  private findUserByIdUseCase!: IFindUserByIdUseCase

  constructor (deleteUserUseCase: IDeleteUserUseCase, findUserByIdUseCase: IFindUserByIdUseCase) {
    this.deleteUserUseCase = deleteUserUseCase
    this.findUserByIdUseCase = findUserByIdUseCase
  }

  async run (input: InputDeleteUser): Promise<IHttpResponse<string>> {
    try {
      const dto = new DeleteUserDTO(input)

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

      return new HttpOkResponse('User Deleted')
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
