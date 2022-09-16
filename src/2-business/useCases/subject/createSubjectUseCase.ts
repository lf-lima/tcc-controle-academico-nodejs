import { IBaseUseCase } from '#business/useCases/base/ibaseUseCase'
import { CreateSubjectInputDto } from '#business/dto/subject/createSubjectInputDto'
import { ISubject } from '#domain/entities/iSubject'
import { ISubjectRepository } from '#business/repositories/iSubjectRepository'

export class CreateSubjectUseCase implements IBaseUseCase<CreateSubjectInputDto, ISubject> {
  private subjectRepository!: ISubjectRepository

  constructor (subjectRepository: ISubjectRepository) {
    this.subjectRepository = subjectRepository
  }

  async run (input: CreateSubjectInputDto): Promise<ISubject> {
    console.log('start create subject use case: ', input)

    const { institutionId, courseId, professorId, subjectDescription, subjectName } = input

    const subject = await this.subjectRepository.create({
      courseId,
      institutionId,
      professorId,
      subjectDescription,
      subjectName
    })

    console.log('subject created: ', subject)

    return subject
  }
}
