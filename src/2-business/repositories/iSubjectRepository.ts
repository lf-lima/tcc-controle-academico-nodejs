import { CreateSubjectInputDto } from '#business/dto/subject/createSubjectInputDto'
import { ISubject } from '#domain/entities/iSubject'

export interface ISubjectRepository {
  create(data: CreateSubjectInputDto): Promise<ISubject>
  findById(subjectId: number): Promise<ISubject>
}
