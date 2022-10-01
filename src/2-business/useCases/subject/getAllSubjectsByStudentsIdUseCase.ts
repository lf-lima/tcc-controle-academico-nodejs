import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { ISubject } from '#domain/entities/iSubject'
import { ISubjectRepository } from '#business/repositories/iSubjectRepository'

export class GetAllSubjectsByStudentIdUseCase implements IBaseUseCase<number, ISubject[]> {
  private subjectRepository!: ISubjectRepository

  constructor (subjectRepository: ISubjectRepository) {
    this.subjectRepository = subjectRepository
  }

  async run (studentId: number): Promise<ISubject[]> {
    console.log('start get all subjects by student id use case, studentId: ', studentId)

    const subjects = await this.subjectRepository.findAllByStudentId(studentId)

    console.log('subjects: ', subjects)

    return subjects
  }
}
