import { ExpressRouter } from '#framework/routers/express/expressRouter'
import { UserRepository } from '#framework/repositories/userRepository'
import { InputCreateInstitution } from '#gateway/serializers/institution/inputCreateInstitution'
import { CreateInstitutionOperation } from '#gateway/operations/institution/createInstitutionOperation'
import { CreateInstitutionUseCase } from '#business/useCases/institution/createInstitutionUseCase'
import { InstitutionRepository } from '#framework/repositories/institutionRepository'

export class InstitutionRouter extends ExpressRouter {
  constructor () {
    super('/institution', [
      {
        routeName: 'createInstitution',
        method: 'post',
        routePath: '',
        input: InputCreateInstitution,
        operation: new CreateInstitutionOperation(
          new CreateInstitutionUseCase(new InstitutionRepository(), new UserRepository())
        ),
        permissions: [
          'createInstitution'
        ]
      }
    ])
  }
}
