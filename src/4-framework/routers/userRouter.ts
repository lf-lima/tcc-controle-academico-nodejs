import { ExpressRouter } from '#framework/routers/express/expressRouter'
import { CreateUserOperation } from '#gateway/operations/user/createUserOperation'
import { CreateUserUseCase } from '#business/useCases/user/createUserUseCase'
import { UserRepository } from '#framework/repositories/userRepository'
import { InputCreateUser } from '#gateway/serializers/user/inputCreateUser'

export class UserRouter extends ExpressRouter {
  constructor () {
    super('/user', [
      {
        routeName: 'createUser',
        method: 'post',
        routePath: '/',
        input: InputCreateUser,
        operation: new CreateUserOperation(
          new CreateUserUseCase(new UserRepository())
        ),
        permissions: [
          'createUser'
        ]
      }
    ])
  }
}
