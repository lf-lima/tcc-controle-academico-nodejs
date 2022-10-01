import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { ISubject } from '#domain/entities/iSubject'
import { ISubjectRepository } from '#business/repositories/iSubjectRepository'

export class GetAllSubjectsByProfessorIdUseCase implements IBaseUseCase<number, ISubject[]> {
  private subjectRepository!: ISubjectRepository

  constructor (subjectRepository: ISubjectRepository) {
    this.subjectRepository = subjectRepository
  }

  async run (professorId: number): Promise<ISubject[]> {
    console.log('start get all subjects by professor id use case, professorId: ', professorId)

    const subjects = await this.subjectRepository.findAllByProfessorId(professorId)

    console.log('subjects: ', subjects)

    return subjects
  }
}
