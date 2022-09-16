import { IBaseUseCase } from '#business/useCases/base/iBaseUseCase'
import { IUserRepository } from '#business/repositories/iUserRepository'
import { CreateStudentInputDto } from '#business/dto/student/createStudentInputDto'
import { IStudent } from '#domain/entities/iStudent'
import { IStudentRepository } from '#business/repositories/iStudentRepository'

export class CreateStudentUseCase implements IBaseUseCase<CreateStudentInputDto, IStudent> {
  private studentRepository!: IStudentRepository
  private userRepository!: IUserRepository

  constructor (studentRepository: IStudentRepository, userRepository: IUserRepository) {
    this.studentRepository = studentRepository
    this.userRepository = userRepository
  }

  async run (input: CreateStudentInputDto): Promise<IStudent> {
    console.log('start create student use case: ', input)

    const { profileId, password, name, institutionId, documentNumber } = input

    const user = await this.userRepository.create({ profileId, password })

    console.log('user created: ', user)

    const student = await this.studentRepository.create({
      userId: user.id,
      password,
      documentNumber,
      name,
      institutionId,
      profileId
    })

    console.log('student created: ', student)

    return student
  }
}
