import { CreateUserUseCase } from '#business/useCases/user/createUserUseCase'
import { ExpressOperationAdapter } from '#framework/adapters/operation/expressOperationAdapter'
import { CreateUserOperation } from '#gateway/operations/user/createUserOperation'
import { UserRepository } from '#framework/repositories/userRepository'
import { ExpressRouter } from '#framework/routers/express/expressRouter'
import { InputCreateUser } from '#gateway/serializers/user/inputCreateUser'

export class UserRouter extends ExpressRouter {
  constructor () {
    super('/user', [
      {
        method: 'post',
        routePath: '/',
        input: InputCreateUser,
        operationAdapter: new ExpressOperationAdapter(
          new CreateUserOperation(
            new CreateUserUseCase(new UserRepository())
          )
        )
      }
    ])
  }
}
