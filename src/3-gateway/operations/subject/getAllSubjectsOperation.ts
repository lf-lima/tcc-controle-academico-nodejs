import { GetAllSubjectsByInstitutionIdUseCase } from '#business/useCases/subject/getAllSubjectsByInstitutionIdUseCase'
import { GetAllSubjectsByProfessorIdUseCase } from '#business/useCases/subject/getAllSubjectsByProfessorIdUseCase'
import { GetAllSubjectsByStudentIdUseCase } from '#business/useCases/subject/getAllSubjectsByStudentsIdUseCase'
import { ISubject } from '#domain/entities/iSubject'
import {
  HttpInternalErrorResponse,
  HttpOkResponse,
  IHttpResponse
} from '#gateway/modules/http/httpResponse'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'
import { InputGetAllSubjects } from '#gateway/serializers/subject/inputGetAllSubjects'

export class GetAllSubjectsOperation implements IBaseOperation<InputGetAllSubjects, ISubject[]> {
  constructor (
    private getAllSubjectsByInstitutionIdUseCase: GetAllSubjectsByInstitutionIdUseCase,
    private getAllSubjectsByProfessorIdUseCase: GetAllSubjectsByProfessorIdUseCase,
    private getAllSubjectsByStudentIdUseCase: GetAllSubjectsByStudentIdUseCase
  ) { }

  async run (input: InputGetAllSubjects): Promise<IHttpResponse<ISubject[]>> {
    console.log('start get all subjects operation, input: ', input)

    try {
      let subjects: ISubject[]

      if (input.studentId) {
        subjects = await this.getAllSubjectsByStudentIdUseCase.run(input.studentId)
      } else if (input.professorId) {
        subjects = await this.getAllSubjectsByProfessorIdUseCase.run(input.professorId)
      } else {
        subjects = await this.getAllSubjectsByInstitutionIdUseCase.run(input.institutionId)
      }

      console.log('subjects: ', subjects)

      return new HttpOkResponse(subjects)
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
