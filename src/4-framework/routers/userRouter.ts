import { CreateUserUseCase } from '#business/useCases/user/createUserUseCase'
import { DeleteUserUseCase } from '#business/useCases/user/deleteUserUseCase'
import { FindAllUsersUseCase } from '#business/useCases/user/findAllUsersUseCase'
import { FindUserByEmailUseCase } from '#business/useCases/user/findUserByEmailUseCase'
import { FindUserByIdUseCase } from '#business/useCases/user/findUserByIdUseCase'
import { UpdateUserUseCase } from '#business/useCases/user/updateUserUseCase'
import { ExpressOperationAdapter } from '#gateway/adapters/operation/express/expressOperationAdapter'
import { CreateUserOperation } from '#gateway/operations/user/createUserOperation'
import { DeleteUserOperation } from '#gateway/operations/user/deleteUserOperation'
import { FindAllUsersOperation } from '#gateway/operations/user/findAllUsersOperation'
import { FindUserByIdOperation } from '#gateway/operations/user/findUserByIdOperation'
import { UpdateUserOperation } from '#gateway/operations/user/updateUserOperation'
import { UserRepository } from '#framework/repositories/userRepository'
import { ExpressRouter } from '#framework/routers/express/expressRouter'
import { InputFindUserById } from '#gateway/serializers/user/inputFindUserById'
import { InputCreateUser } from '#gateway/serializers/user/inputCreateUser'
import { InputUpdateUser } from '#gateway/serializers/user/inputUpdateUser'

export class UserRouter extends ExpressRouter {
  constructor () {
    super('/user', [
      {
        method: 'get',
        routePath: '/',
        operationAdapter: new ExpressOperationAdapter(
          new FindAllUsersOperation(
            new FindAllUsersUseCase(new UserRepository())
          )
        )
      },
      {
        method: 'get',
        routePath: '/:userId',
        input: InputFindUserById,
        operationAdapter: new ExpressOperationAdapter(
          new FindUserByIdOperation(
            new FindUserByIdUseCase(new UserRepository())
          )
        )
      },
      {
        method: 'post',
        routePath: '/',
        input: InputCreateUser,
        operationAdapter: new ExpressOperationAdapter(
          new CreateUserOperation(
            new CreateUserUseCase(new UserRepository()),
            new FindUserByEmailUseCase(new UserRepository())
          )
        )
      },
      {
        method: 'put',
        routePath: '/:userId',
        input: InputUpdateUser,
        operationAdapter: new ExpressOperationAdapter(
          new UpdateUserOperation(
            new UpdateUserUseCase(new UserRepository()),
            new FindUserByEmailUseCase(new UserRepository()),
            new FindUserByIdUseCase(new UserRepository())
          )
        )
      },
      {
        method: 'delete',
        routePath: '/:userId',
        input: InputUpdateUser,
        operationAdapter: new ExpressOperationAdapter(
          new DeleteUserOperation(
            new DeleteUserUseCase(new UserRepository()),
            new FindUserByIdUseCase(new UserRepository())
          )
        )
      }
    ])
  }
}
