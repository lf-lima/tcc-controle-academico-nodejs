import { CourseRouter } from '#framework/routers/courseRouter'
import { DefaultRouter } from '#framework/routers/defaultRouter'
import { InstitutionRouter } from '#framework/routers/institutionRouter'
import { LoginRouter } from '#framework/routers/loginRouter'
import { ProfessorRouter } from '#framework/routers/professorRouter'
import { StudentRouter } from '#framework/routers/studentRouter'
import { SubjectRouter } from '#framework/routers/subjectRouter'

export const routers = [
  new DefaultRouter(),
  new InstitutionRouter(),
  new ProfessorRouter(),
  new StudentRouter(),
  new CourseRouter(),
  new SubjectRouter(),
  new LoginRouter()
]
