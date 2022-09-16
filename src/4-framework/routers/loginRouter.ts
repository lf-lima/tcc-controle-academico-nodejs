import { ExpressRouter } from '#framework/routers/express/expressRouter'
import { InputLogin } from '#gateway/serializers/login/inputLogin'
import { LoginOperation } from '#gateway/operations/login/LoginOperation'
import { LoginUseCase } from '#business/useCases/login/loginUseCase'
import { UserRepository } from '#framework/repositories/userRepository'
import { StudentRepository } from '#framework/repositories/studentRepository'
import { ProfessorRepository } from '#framework/repositories/professorRepository'
import { InstitutionRepository } from '#framework/repositories/institutionRepository'

export class LoginRouter extends ExpressRouter {
  constructor () {
    super('/login', [
      {
        routeName: 'login',
        method: 'post',
        routePath: '',
        input: InputLogin,
        operation: new LoginOperation(
          new LoginUseCase(new UserRepository(), new StudentRepository(), new ProfessorRepository(), new InstitutionRepository())
        )
      }
    ])
  }
}
