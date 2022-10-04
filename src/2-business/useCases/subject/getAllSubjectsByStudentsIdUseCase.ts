import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { ISubject } from '#domain/entities/iSubject'
import { ISubjectRepository } from '#business/repositories/iSubjectRepository'
import { IStudentRepository } from '#business/repositories/iStudentRepository'

export class GetAllSubjectsByStudentIdUseCase implements IBaseUseCase<number, ISubject[]> {

  constructor (
    private subjectRepository: ISubjectRepository,
    private studentRepository: IStudentRepository
  ) { }

  async run (studentId: number): Promise<ISubject[]> {
    console.log('start get all subjects by student id use case, studentId: ', studentId)

    const student = await this.studentRepository.findById(studentId)

    if (!student) {
      console.error('student not exits')
      throw new Error('Student not exists')
    }

    console.log('student: ', student)

    const subjects = await this.subjectRepository.findAllByCourseId(student.courseId)

    console.log('subjects: ', subjects)

    return subjects
  }
}
