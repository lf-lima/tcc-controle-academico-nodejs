import { ExpressRouter } from '#framework/routers/express/expressRouter'
import { UserRepository } from '#framework/repositories/userRepository'
import { InputCreateInstitution } from '#gateway/serializers/institution/inputCreateInstitution'
import { CreateInstitutionOperation } from '#gateway/operations/institution/createInstitutionOperation'
import { CreateInstitutionUseCase } from '#business/useCases/institution/createInstitutionUseCase'
import { InstitutionRepository } from '#framework/repositories/institutionRepository'
import { CreateUserUseCase } from '#business/useCases/user/createUserUseCase'
import { ProfileRepository } from '#framework/repositories/profileRepository'
import { GetAllInstitutionsOperation } from '#gateway/operations/institution/getAllInstitutionsOperation'
import { GetAllInstitutionsUseCase } from '#business/useCases/institution/getAllInstitutionsUseCase'

export class InstitutionRouter extends ExpressRouter {
  constructor () {
    super('/institution', [
      {
        routeName: 'createInstitution',
        method: 'post',
        routePath: '',
        input: InputCreateInstitution,
        operation: new CreateInstitutionOperation(
          new CreateInstitutionUseCase(
            new InstitutionRepository(), new ProfileRepository(), new CreateUserUseCase(new UserRepository())
          )
        ),
        permissions: [
          'createInstitution'
        ]
      },
      {
        routeName: 'getAllInstitutions',
        method: 'get',
        routePath: '',
        operation: new GetAllInstitutionsOperation(
          new GetAllInstitutionsUseCase(
            new InstitutionRepository()
          )
        ),
        permissions: [
          'getAllInstitutions'
        ]
      }
    ])
  }
}
