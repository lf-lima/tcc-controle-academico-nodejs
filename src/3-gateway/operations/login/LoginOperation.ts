import { LoginUseCase } from '#business/useCases/login/loginUseCase'
import {
  HttpInternalErrorResponse,
  HttpOkResponse,
  IHttpResponse
} from '#gateway/modules/http/httpResponse'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'
import { InputLogin } from '#gateway/serializers/login/inputLogin'
import { OutputLogin } from '#gateway/serializers/login/outputLogin'

export class LoginOperation implements IBaseOperation<InputLogin, OutputLogin> {
  private loginUseCase!: LoginUseCase

  constructor (loginUseCase: LoginUseCase) {
    this.loginUseCase = loginUseCase
  }

  async run (input: InputLogin): Promise<IHttpResponse<OutputLogin>> {
    try {
      console.log('start login operation operation, input: ', input)

      const outputLogin = await this.loginUseCase.run(input)

      console.log('success login')

      return new HttpOkResponse(outputLogin)
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
