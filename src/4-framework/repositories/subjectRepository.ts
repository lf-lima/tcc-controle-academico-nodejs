import { PartialBy } from '#business/utils/partialBy'
import Subject from '#framework/models/mysql/subject.model'
import { ISubject } from '#domain/entities/iSubject'
import { ISubjectRepository } from '#business/repositories/iSubjectRepository'
import SubjectStudent from '#framework/models/mysql/subjectStudent.model'

export class SubjectRepository implements ISubjectRepository {
  private readonly repo: typeof Subject = Subject
  private readonly repoSubjectStudent: typeof SubjectStudent = SubjectStudent

  async create (data: PartialBy<ISubject, 'id'>): Promise<ISubject> {
    return await this.repo.create(data as Subject)
  }

  async findById (subjectId: number): Promise<ISubject> {
    return await this.repo.findByPk(subjectId) as ISubject
  }

  async findAllByInstitutionId (institutionId: number): Promise<ISubject[]> {
    return await this.repo.findAll({ where: { institutionId } })
  }

  async findAllByProfessorId (professorId: number): Promise<ISubject[]> {
    return await this.repo.findAll({ where: { professorId } })
  }

  async findAllByStudentId (studentId: number): Promise<ISubject[]> {
    const subjectsStudent = await this.repoSubjectStudent.findAll({ where: { studentId } })
    const subjectIds = subjectsStudent.map(({ subjectId }) => subjectId)

    return await this.repo.findAll({ where: { id: subjectIds } })
  }

}
