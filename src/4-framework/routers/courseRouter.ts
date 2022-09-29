import { ExpressRouter } from '#framework/routers/express/expressRouter'
import { CreateCourseOperation } from '#gateway/operations/course/createCourseOperation'
import { InputCreateCourse } from '#gateway/serializers/course/inputCreateCourse'
import { CreateCourseUseCase } from '#business/useCases/course/createCourseUseCase'
import { CourseRepository } from '#framework/repositories/courseRepository'
import { InputGetAllCoursesByInstitutionId } from '#gateway/serializers/course/inputGetAllCoursesByInstitutionId'
import { GetAllCoursesByInstitutionIdOperation } from '#gateway/operations/course/getAllCoursesByInstitutionIdOperation'
import { GetAllCoursesByInstitutionIdUseCase } from '#business/useCases/course/getAllCoursesByInstitutionIdUseCase'

export class CourseRouter extends ExpressRouter {
  constructor () {
    super('/course', [
      {
        routeName: 'createCourse',
        method: 'post',
        routePath: '',
        input: InputCreateCourse,
        inputNormalizer: ({ body }) => new InputCreateCourse({
          ...body,
          institutionId: Number(body.tokenPayload.institutionId ?? body.institutionId)
        }),
        operation: new CreateCourseOperation(
          new CreateCourseUseCase(new CourseRepository())
        ),
        permissions: [
          'createCourse'
        ]
      },
      {
        routeName: 'getAllCoursesByInstitutionId',
        method: 'get',
        routePath: '',
        input: InputGetAllCoursesByInstitutionId,
        inputNormalizer: ({ body }) => new InputGetAllCoursesByInstitutionId({
          institutionId: Number(body.tokenPayload.institutionId || body.institutionId)
        }),
        operation: new GetAllCoursesByInstitutionIdOperation(
          new GetAllCoursesByInstitutionIdUseCase(
            new CourseRepository()
          )
        ),
        permissions: [
          'getAllCoursesByInstitutionId'
        ]
      }
    ])
  }
}
