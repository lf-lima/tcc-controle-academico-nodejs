import { PartialBy } from '#business/utils/partialBy'
import Subject from '#framework/models/mysql/subject.model'
import { ISubject } from '#domain/entities/iSubject'
import { ISubjectRepository } from '#business/repositories/iSubjectRepository'
import Professor from '#framework/models/mysql/professor.model'

export class SubjectRepository implements ISubjectRepository {
  private readonly repo: typeof Subject = Subject

  async create (data: PartialBy<ISubject, 'id'>): Promise<ISubject> {
    return await this.repo.create(data as Subject)
  }

  async findById (subjectId: number): Promise<ISubject> {
    return await this.repo.findByPk(subjectId) as ISubject
  }

  async findAllByInstitutionId (institutionId: number): Promise<ISubject[]> {
    return await this.repo.findAll({
      include: [Professor],
      where: { institutionId }
    })
  }

  async findAllByProfessorId (professorId: number): Promise<ISubject[]> {
    return await this.repo.findAll({
      include: [Professor],
      where: { professorId }
    })
  }

  async findAllByCourseId (courseId: number): Promise<ISubject[]> {
    return await this.repo.findAll({
      include: [Professor],
      where: { courseId }
    })
  }
}
