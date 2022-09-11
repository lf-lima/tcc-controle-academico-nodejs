import { IUser } from '#domain/entities/iUser'
import { FindUserByEmailDTO, FindUserByIdDTO, UpdateUserDTO } from '#business/dto/user'
import { IFindUserByEmailUseCase } from '#business/useCases/user/findUserByEmailUseCase'
import { IFindUserByIdUseCase } from '#business/useCases/user/findUserByIdUseCase'
import { IUpdateUserUseCase } from '#business/useCases/user/updateUserUseCase'
import { HttpBadRequestResponse, HttpInternalErrorResponse, HttpOkResponse, IHttpResponse } from '#gateway/modules/http/httpResponse'
import { InputUpdateUser } from '#gateway/serializers/user/inputUpdateUser'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'

export type IUpdateUserOperation = IBaseOperation<InputUpdateUser, IUser>

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

  async run (input: InputUpdateUser): Promise<IHttpResponse<IUser>> {
    try {
      const updateUserDTO = new UpdateUserDTO(input)
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

      return new HttpOkResponse(await this.updateUserUseCase.run(updateUserDTO))
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
