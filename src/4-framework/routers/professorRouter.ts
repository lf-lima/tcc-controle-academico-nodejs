import { ExpressRouter } from '#framework/routers/express/expressRouter'
import { UserRepository } from '#framework/repositories/userRepository'
import { InputCreateProfessor } from '#gateway/serializers/professor/inputCreateProfessor'
import { CreateProfessorOperation } from '#gateway/operations/professor/createProfessorOperation'
import { CreateProfessorUseCase } from '#business/useCases/professor/createProfessorUseCase'
import { ProfessorRepository } from '#framework/repositories/professorRepository'
import { CreateUserUseCase } from '#business/useCases/user/createUserUseCase'
import { ProfileRepository } from '#framework/repositories/profileRepository'

export class ProfessorRouter extends ExpressRouter {
  constructor () {
    super('/professor', [
      {
        routeName: 'createProfessor',
        method: 'post',
        routePath: '',
        input: InputCreateProfessor,
        inputNormalizer: ({ body }) => new InputCreateProfessor({
          ...body,
          institutionId: Number(body.tokenPayload.institutionId),
        }),
        operation: new CreateProfessorOperation(
          new CreateProfessorUseCase(
            new ProfessorRepository(), new ProfileRepository(), new CreateUserUseCase(new UserRepository())
          )
        ),
        permissions: [
          'createProfessor'
        ]
      }
    ])
  }
}
