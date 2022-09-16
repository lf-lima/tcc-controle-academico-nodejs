import { ExpressRouter } from '#framework/routers/express/expressRouter'
import { UserRepository } from '#framework/repositories/userRepository'
import { InputCreateProfessor } from '#gateway/serializers/professor/inputCreateProfessor'
import { CreateProfessorOperation } from '#gateway/operations/professor/createProfessorOperation'
import { CreateProfessorUseCase } from '#business/useCases/professor/createProfessorUseCase'
import { ProfessorRepository } from '#framework/repositories/professorRepository'

export class ProfessorRouter extends ExpressRouter {
  constructor () {
    super('/professor', [
      {
        routeName: 'createProfessor',
        method: 'post',
        routePath: '',
        input: InputCreateProfessor,
        operation: new CreateProfessorOperation(
          new CreateProfessorUseCase(new ProfessorRepository(), new UserRepository())
        )
      }
    ])
  }
}
