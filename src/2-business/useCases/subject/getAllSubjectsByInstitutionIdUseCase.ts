import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { ISubject } from '#domain/entities/iSubject'
import { ISubjectRepository } from '#business/repositories/iSubjectRepository'

export class GetAllSubjectsByInstitutionIdUseCase implements IBaseUseCase<number, ISubject[]> {
  private subjectRepository!: ISubjectRepository

  constructor (subjectRepository: ISubjectRepository) {
    this.subjectRepository = subjectRepository
  }

  async run (institutionId: number): Promise<ISubject[]> {
    console.log('start get all subjects by institution id use case, institutionId: ', institutionId)

    const subjects = await this.subjectRepository.findAllByInstitutionId(institutionId)

    console.log('subjects: ', subjects)

    return subjects
  }
}
