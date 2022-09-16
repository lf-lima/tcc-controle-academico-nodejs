import { PartialBy } from '#business/utils/partialBy'
import Subject from '#framework/models/mysql/subject.model'
import { ISubject } from '#domain/entities/iSubject'
import { ISubjectRepository } from '#business/repositories/iSubjectRepository'

export class SubjectRepository implements ISubjectRepository {
  private readonly repo: typeof Subject = Subject

  async create (data: PartialBy<ISubject, 'id'>): Promise<ISubject> {
    return await this.repo.create(data as Subject)
  }
}
