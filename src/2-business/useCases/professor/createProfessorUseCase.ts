import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { CreateProfessorInputDto } from '#business/dto/professor/createProfessorInputDto'
import { IProfessor } from '#domain/entities/iProfessor'
import { IProfessorRepository } from '#business/repositories/iProfessorRepository'
import { CreateUserUseCase } from '#business/useCases/user/createUserUseCase'
import { ProfileName } from '#domain/enums/profileName'
import { IProfileRepository } from '#business/repositories/iProfileRepository'

export class CreateProfessorUseCase implements IBaseUseCase<CreateProfessorInputDto, IProfessor> {
  private professorRepository!: IProfessorRepository
  private profileRepository!: IProfileRepository
  private createUserUseCase!: CreateUserUseCase

  constructor (
    professorRepository: IProfessorRepository,
    profileRepository: IProfileRepository,
    createUserUseCase: CreateUserUseCase
  ) {
    this.professorRepository = professorRepository
    this.profileRepository = profileRepository
    this.createUserUseCase = createUserUseCase
  }

  async run (input: CreateProfessorInputDto): Promise<IProfessor> {
    console.log('start create professor use case: ', input)

    const { password, name, institutionId, documentNumber } = input

    const profile = await this.profileRepository.findByName(ProfileName.PROFESSOR)

    if (!profile) {
      console.error(`Profile don't exists`)
      throw new Error(`Profile don't exists`)
    }

    const user = await this.createUserUseCase.run({ profileId: profile.id, password, documentNumber })

    console.log('user created: ', user)

    const professor = await this.professorRepository.create({
      userId: user.id,
      name,
      institutionId
    })

    console.log('professor created: ', professor)

    return professor
  }
}
