import { CreateUserDTO, FindUserByEmailDTO } from '#business/dto/user'
import {
  HttpBadRequestResponse,
  HttpInternalErrorResponse,
  HttpOkResponse,
  IHttpResponse
} from '#gateway/modules/http/httpResponse'
import { InputCreateUser } from '#gateway/serializers/user/inputCreateUser'
import { ICreateUserUseCase } from '#business/useCases/user/createUserUseCase'
import { IFindUserByEmailUseCase } from '#business/useCases/user/findUserByEmailUseCase'
import { IHttpResponseError } from '#gateway/modules/errors/http/httpResponseErrors'
import { IUser } from '#domain/entities/iUser'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'

export class CreateUserOperation implements IBaseOperation<InputCreateUser, IUser> {
  private createUserUseCase!: ICreateUserUseCase
  private findUserByEmailUseCase!: IFindUserByEmailUseCase

  constructor (createUserUseCase: ICreateUserUseCase, findUserByEmailUseCase: IFindUserByEmailUseCase) {
    this.createUserUseCase = createUserUseCase
    this.findUserByEmailUseCase = findUserByEmailUseCase
  }

  async run (input: InputCreateUser): Promise<IHttpResponse<IUser | IHttpResponseError[]>> {
    try {
      const createUserDTO = new CreateUserDTO(input)

      const findUserByEmailDTO = new FindUserByEmailDTO(input)

      const userAlreadyExists = await this.findUserByEmailUseCase.run(findUserByEmailDTO)

      if (userAlreadyExists) {
        return new HttpBadRequestResponse([
          {
            property: 'user',
            messages: [
              'User Already Exists in System'
            ]
          }
        ])
      }

      return new HttpOkResponse(await this.createUserUseCase.run(createUserDTO))
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
