import { IUser } from '#domain/entities/iUser'
import { FindUserByIdDTO } from '#business/dto/user'
import { IFindUserByIdUseCase } from '#business/useCases/user/findUserByIdUseCase'
import { HttpBadRequestResponse, HttpInternalErrorResponse, HttpOkResponse, IHttpResponse } from '#gateway/modules/http/httpResponse'
import { InputFindUserById } from '#gateway/serializers/user/inputFindUserById'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'

export type IFindUserByIdOperation = IBaseOperation<InputFindUserById, IUser>

export class FindUserByIdOperation implements IFindUserByIdOperation {
  private findUserByIdUseCase!: IFindUserByIdUseCase

  constructor (findUserByIdUseCase: IFindUserByIdUseCase) {
    this.findUserByIdUseCase = findUserByIdUseCase
  }

  async run (input: InputFindUserById): Promise<IHttpResponse<IUser>> {
    try {
      const dto = new FindUserByIdDTO(input)

      const user = await this.findUserByIdUseCase.run(dto)

      if (!user) {
        return new HttpBadRequestResponse([{
          property: 'user',
          messages: [
            'User not Exists in System'
          ]
        }])
      }

      return new HttpOkResponse(user)
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
