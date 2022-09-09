import { CreateUserUseCase } from '../../2-business/useCases/user/createUserUseCase'
import { DeleteUserUseCase } from '../../2-business/useCases/user/deleteUserUseCase'
import { FindAllUsersUseCase } from '../../2-business/useCases/user/findAllUsersUseCase'
import { FindUserByEmailUseCase } from '../../2-business/useCases/user/findUserByEmailUseCase'
import { FindUserByIdUseCase } from '../../2-business/useCases/user/findUserByIdUseCase'
import { UpdateUserUseCase } from '../../2-business/useCases/user/updateUserUseCase'
import { ExpressOperationAdapter } from '../../3-gateway/operations/adapter/express/iExpressOperationAdapter'
import { CreateUserOperation } from '../../3-gateway/operations/user/createUserOperation'
import { DeleteUserOperation } from '../../3-gateway/operations/user/deleteUserOperation'
import { FindAllUsersOperation } from '../../3-gateway/operations/user/findAllUsersOperation'
import { FindUserByIdOperation } from '../../3-gateway/operations/user/findUserByIdOperation'
import { UpdateUserOperation } from '../../3-gateway/operations/user/updateUserOperation'
import User from '../models/sequelize/user.model'
import { UserRepository } from '../repositories/userRepository'
import { ExpressRouter } from './express/expressRouter'

export class UserRouter extends ExpressRouter {
  constructor () {
    super('/user')

    this.router.get('/', new ExpressOperationAdapter(
      new FindAllUsersOperation(
        new FindAllUsersUseCase(new UserRepository(User))
      )
    ).adapt()
    )

    this.router.get('/:userId', new ExpressOperationAdapter(
      new FindUserByIdOperation(
        new FindUserByIdUseCase(new UserRepository(User))
      )
    ).adapt()
    )

    this.router.post('/', new ExpressOperationAdapter(
      new CreateUserOperation(
        new CreateUserUseCase(new UserRepository(User)),
        new FindUserByEmailUseCase(new UserRepository(User))
      )
    ).adapt()
    )

    this.router.put('/:userId', new ExpressOperationAdapter(
      new UpdateUserOperation(
        new UpdateUserUseCase(new UserRepository(User)),
        new FindUserByEmailUseCase(new UserRepository(User)),
        new FindUserByIdUseCase(new UserRepository(User))
      )
    ).adapt()
    )

    this.router.delete('/:userId', new ExpressOperationAdapter(
      new DeleteUserOperation(
        new DeleteUserUseCase(new UserRepository(User)),
        new FindUserByIdUseCase(new UserRepository(User))
      )
    ).adapt()
    )
  }
}
