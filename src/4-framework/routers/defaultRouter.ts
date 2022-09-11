import { FindAllUsersUseCase } from '#business/useCases/user/findAllUsersUseCase'
import { UserRepository } from '#framework/repositories/userRepository'
import { ExpressRouter } from '#framework/routers/express/expressRouter'
import { ExpressOperationAdapter } from '#gateway/adapters/operation/express/expressOperationAdapter'
import { FindAllUsersOperation } from '#gateway/operations/user/findAllUsersOperation'

export class DefaultRouter extends ExpressRouter {
  constructor () {
    super('/', [
      {
        method: 'get',
        routePath: '/',
        operationAdapter: new ExpressOperationAdapter(
          new FindAllUsersOperation(
            new FindAllUsersUseCase(new UserRepository())
          )
        )
      }
    ])
  }
}
