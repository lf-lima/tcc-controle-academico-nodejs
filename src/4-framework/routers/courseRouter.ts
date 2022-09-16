import { ExpressRouter } from '#framework/routers/express/expressRouter'
import { CreateCourseOperation } from '#gateway/operations/course/createCourseOperation'
import { InputCreateCourse } from '#gateway/serializers/course/inputCreateCourse'
import { CreateCourseUseCase } from '#business/useCases/course/createCourseUseCase'
import { CourseRepository } from '#framework/repositories/courseRepository'

export class CourseRouter extends ExpressRouter {
  constructor () {
    super('/course', [
      {
        routeName: 'createCourse',
        method: 'post',
        routePath: '',
        input: InputCreateCourse,
        operation: new CreateCourseOperation(
          new CreateCourseUseCase(new CourseRepository())
        ),
        permissions: [
          'createCourse'
        ]
      }
    ])
  }
}
