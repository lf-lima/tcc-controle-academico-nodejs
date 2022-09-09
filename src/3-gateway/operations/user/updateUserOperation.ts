import { IUser } from '../../../1-domain/entities/iUser'
import { FindUserByEmailDTO, FindUserByIdDTO, UpdateUserDTO } from '../../../2-business/dto/user'
import { IFindUserByEmailUseCase } from '../../../2-business/useCases/user/findUserByEmailUseCase'
import { IFindUserByIdUseCase } from '../../../2-business/useCases/user/findUserByIdUseCase'
import { IUpdateUserUseCase } from '../../../2-business/useCases/user/updateUserUseCase'
import { IHttpResponseError } from '../../modules/errors/http/httpReponseErrors'
import { IHttpRequest } from '../../modules/http/httpRequest'
import { HttpBadRequestResponse, HttpInternalErrorResponse, HttpSuccessResponse, IHttpResponse } from '../../modules/http/httpResponse'
import { IInputUpdateUser, InputUpdateUser } from '../../serializers/user/inputUpdateUser'
import { IBaseOperation } from '../base/iBaseOperation'

export type IUpdateUserOperation = IBaseOperation<IInputUpdateUser, IUser>

export class UpdateUserOperation implements IUpdateUserOperation {
  private updateUserUseCase!: IUpdateUserUseCase
  private findUserByEmailUseCase!: IFindUserByEmailUseCase
  private findUserByIdUseCase!: IFindUserByIdUseCase

  constructor (
    updateUserUseCase: IUpdateUserUseCase,
    findUserByEmailUseCase: IFindUserByEmailUseCase,
    findUserByIdUseCase: IFindUserByIdUseCase
  ) {
    this.updateUserUseCase = updateUserUseCase
    this.findUserByEmailUseCase = findUserByEmailUseCase
    this.findUserByIdUseCase = findUserByIdUseCase
  }

  async run (httpRequest: IHttpRequest<IInputUpdateUser>): Promise<IHttpResponse<IUser | IHttpResponseError[]>> {
    try {
      httpRequest.body.userId = Number(httpRequest.body.userId)

      const inputUpdateUser = new InputUpdateUser(httpRequest.body)

      const errors = await inputUpdateUser.validate()

      if (inputUpdateUser.hasError) {
        return new HttpBadRequestResponse(errors)
      }

      const updateUserDTO = new UpdateUserDTO(httpRequest.body)
      const findUserByIdDTO = new FindUserByIdDTO({ userId: updateUserDTO.userId })

      const user = await this.findUserByIdUseCase.run(findUserByIdDTO)

      if (!user) {
        return new HttpBadRequestResponse([{
          property: 'user',
          messages: [
            'User not Exists in System'
          ]
        }])
      }

      if (updateUserDTO.email) {
        const findUserByEmailDTO = new FindUserByEmailDTO({ email: updateUserDTO.email })

        const userWithEmail = await this.findUserByEmailUseCase.run(findUserByEmailDTO)

        if (userWithEmail && updateUserDTO.email !== user.email) {
          return new HttpBadRequestResponse([{
            property: 'user',
            messages: [
              'User Already Exists in System'
            ]
          }])
        }
      }

      return new HttpSuccessResponse(await this.updateUserUseCase.run(updateUserDTO))
    } catch (error: any) {
      return new HttpInternalErrorResponse(error.message)
    }
  }
}
