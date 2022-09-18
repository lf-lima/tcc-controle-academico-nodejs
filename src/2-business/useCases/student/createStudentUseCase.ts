import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { CreateStudentInputDto } from '#business/dto/student/createStudentInputDto'
import { IStudent } from '#domain/entities/iStudent'
import { IStudentRepository } from '#business/repositories/iStudentRepository'
import { CreateUserUseCase } from '#business/useCases/user/createUserUseCase'

export class CreateStudentUseCase implements IBaseUseCase<CreateStudentInputDto, IStudent> {
  private studentRepository!: IStudentRepository
  private createUserUseCase!: CreateUserUseCase

  constructor (studentRepository: IStudentRepository, createUserUseCase: CreateUserUseCase) {
    this.studentRepository = studentRepository
    this.createUserUseCase = createUserUseCase
  }

  async run (input: CreateStudentInputDto): Promise<IStudent> {
    console.log('start create student use case: ', input)

    const { profileId, password, name, institutionId, documentNumber } = input

    const user = await this.createUserUseCase.run({ profileId, password, documentNumber })

    console.log('user created: ', user)

    const student = await this.studentRepository.create({
      userId: user.id,
      name,
      institutionId
    })

    console.log('student created: ', student)

    return student
  }
}
