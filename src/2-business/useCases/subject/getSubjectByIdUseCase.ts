import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { ISubject } from '#domain/entities/iSubject'
import { ISubjectRepository } from '#business/repositories/iSubjectRepository'

export class GetSubjectByIdUseCase implements IBaseUseCase<number, ISubject> {
  private subjectRepository!: ISubjectRepository

  constructor (subjectRepository: ISubjectRepository) {
    this.subjectRepository = subjectRepository
  }

  async run (subjectId: number): Promise<ISubject> {
    console.log('start get subject by id use case, subjectId: ', subjectId)

    const subject = await this.subjectRepository.findById(subjectId)

    console.log('subject: ', subject)

    return subject
  }
}
