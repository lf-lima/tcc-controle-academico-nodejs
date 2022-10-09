import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { IStudent } from '#domain/entities/iStudent'
import { IStudentRepository } from '#business/repositories/iStudentRepository'

export class GetAllStudentsByInstitutionIdUseCase implements IBaseUseCase<number, IStudent[]> {
  constructor (
    private studentRepository: IStudentRepository
  ) { }

  async run (institutionId: number): Promise<IStudent[]> {
    console.log('start get all students use case')

    const students = await this.studentRepository.findAllByInstitutionId(institutionId)

    console.log('students: ', students)

    return students
  }
}
