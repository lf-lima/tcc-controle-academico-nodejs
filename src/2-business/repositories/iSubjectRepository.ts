import { CreateSubjectInputDto } from '#business/dto/subject/createSubjectInputDto'
import { ISubject } from '#domain/entities/iSubject'

export interface ISubjectRepository {
  create(data: CreateSubjectInputDto): Promise<ISubject>
  findById(subjectId: number): Promise<ISubject>
  findAllByInstitutionId(institutionId: number): Promise<ISubject[]>
  findAllByProfessorId(professorId: number): Promise<ISubject[]>
  findAllByCourseId(courseId: number): Promise<ISubject[]>
}
