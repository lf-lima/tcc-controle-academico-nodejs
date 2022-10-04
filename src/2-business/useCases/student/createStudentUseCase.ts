import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { CreateStudentInputDto } from '#business/dto/student/createStudentInputDto'
import { IStudent } from '#domain/entities/iStudent'
import { IStudentRepository } from '#business/repositories/iStudentRepository'
import { CreateUserUseCase } from '#business/useCases/user/createUserUseCase'
import { ProfileName } from '#domain/enums/profileName'
import { IProfileRepository } from '#business/repositories/iProfileRepository'

export class CreateStudentUseCase implements IBaseUseCase<CreateStudentInputDto, IStudent> {
  private studentRepository!: IStudentRepository
  private profileRepository!: IProfileRepository
  private createUserUseCase!: CreateUserUseCase

  constructor (
    studentRepository: IStudentRepository,
    profileRepository: IProfileRepository,
    createUserUseCase: CreateUserUseCase
    ) {
    this.studentRepository = studentRepository
    this.profileRepository = profileRepository
    this.createUserUseCase = createUserUseCase
  }

  async run (input: CreateStudentInputDto): Promise<IStudent> {
    console.log('start create student use case: ', input)

    const { password, name, institutionId, documentNumber, courseId } = input

    const profile = await this.profileRepository.findByName(ProfileName.STUDENT)

    if (!profile) {
      console.error(`Profile don't exists`)
      throw new Error(`Profile don't exists`)
    }

    const user = await this.createUserUseCase.run({ profileId: profile.id, password, documentNumber })

    console.log('user created: ', user)

    const student = await this.studentRepository.create({
      userId: user.id,
      name,
      institutionId,
      courseId
    })

    console.log('student created: ', student)

    return student
  }
}
