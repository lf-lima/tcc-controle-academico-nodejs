import {
  HttpInternalErrorResponse,
  HttpOkResponse,
  IHttpResponse
} from '#gateway/modules/http/httpResponse'
import { InputCreateUser } from '#gateway/serializers/user/inputCreateUser'
import { ICreateUserUseCase } from '#business/useCases/user/createUserUseCase'
import { IUser } from '#domain/entities/iUser'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'

export class CreateUserOperation implements IBaseOperation<InputCreateUser, IUser> {
  private createUserUseCase!: ICreateUserUseCase

  constructor (createUserUseCase: ICreateUserUseCase) {
    this.createUserUseCase = createUserUseCase
  }

  async run (input: InputCreateUser): Promise<IHttpResponse<IUser>> {
    try {
      return new HttpOkResponse(await this.createUserUseCase.run(input))
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
