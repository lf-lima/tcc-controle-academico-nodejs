import { ExpressRouter } from '#framework/routers/express/expressRouter'
import { UserRepository } from '#framework/repositories/userRepository'
import { InputCreateStudent } from '#gateway/serializers/student/inputCreateStudent'
import { CreateStudentOperation } from '#gateway/operations/student/createStudentOperation'
import { CreateStudentUseCase } from '#business/useCases/student/createStudentUseCase'
import { StudentRepository } from '#framework/repositories/studentRepository'

export class StudentRouter extends ExpressRouter {
  constructor () {
    super('/student', [
      {
        routeName: 'createStudent',
        method: 'post',
        routePath: '',
        input: InputCreateStudent,
        operation: new CreateStudentOperation(
          new CreateStudentUseCase(new StudentRepository(), new UserRepository())
        )
      }
    ])
  }
}
