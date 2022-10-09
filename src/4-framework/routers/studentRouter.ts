import { ExpressRouter } from '#framework/routers/express/expressRouter'
import { UserRepository } from '#framework/repositories/userRepository'
import { InputCreateStudent } from '#gateway/serializers/student/inputCreateStudent'
import { CreateStudentOperation } from '#gateway/operations/student/createStudentOperation'
import { CreateStudentUseCase } from '#business/useCases/student/createStudentUseCase'
import { StudentRepository } from '#framework/repositories/studentRepository'
import { CreateUserUseCase } from '#business/useCases/user/createUserUseCase'
import { ProfileRepository } from '#framework/repositories/profileRepository'
import { GetAllStudentsByInstitutionIdOperation } from '#gateway/operations/student/getAllStudentsByInstitutionIdOperation'
import { InputGetAllStudentsByInstitutionId } from '#gateway/serializers/student/inputGetAllStudentsByInstitutionId'
import { GetAllStudentsByInstitutionIdUseCase } from '#business/useCases/student/getAllStudentsByInstitutionIdUseCase'

export class StudentRouter extends ExpressRouter {
  constructor () {
    super('/student', [
      {
        routeName: 'createStudent',
        method: 'post',
        routePath: '',
        input: InputCreateStudent,
        inputNormalizer: ({ body }) => new InputCreateStudent({
          ...body,
          institutionId: Number(body.tokenPayload.institutionId ?? body.institutionId)
        }),
        operation: new CreateStudentOperation(
          new CreateStudentUseCase(
            new StudentRepository(), new ProfileRepository(), new CreateUserUseCase(new UserRepository())
          )
        ),
        permissions: [
          'createStudent'
        ]
      },
      {
        routeName: 'getAllStudentsByInstitutionId',
        method: 'get',
        routePath: '',
        input: InputGetAllStudentsByInstitutionId,
        inputNormalizer: ({ body }) => new InputGetAllStudentsByInstitutionId({
          institutionId: Number(body.tokenPayload.institutionId || body.institutionId)
        }),
        operation: new GetAllStudentsByInstitutionIdOperation(
          new GetAllStudentsByInstitutionIdUseCase(
            new StudentRepository()
          )
        ),
        permissions: [
          'getAllStudentsByInstitutionId'
        ]
      }
    ])
  }
}
