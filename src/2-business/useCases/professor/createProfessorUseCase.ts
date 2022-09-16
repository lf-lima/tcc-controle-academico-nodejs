import { IBaseUseCase } from '#business/useCases/base/iBaseUseCase'
import { IUserRepository } from '#business/repositories/iUserRepository'
import { CreateProfessorInputDto } from '#business/dto/professor/createProfessorInputDto'
import { IProfessor } from '#domain/entities/iProfessor'
import { IProfessorRepository } from '#business/repositories/iProfessorRepository'

export class CreateProfessorUseCase implements IBaseUseCase<CreateProfessorInputDto, IProfessor> {
  private professorRepository!: IProfessorRepository
  private userRepository!: IUserRepository

  constructor (professorRepository: IProfessorRepository, userRepository: IUserRepository) {
    this.professorRepository = professorRepository
    this.userRepository = userRepository
  }

  async run (input: CreateProfessorInputDto): Promise<IProfessor> {
    console.log('start create professor use case: ', input)

    const { profileId, password, name, institutionId, documentNumber } = input

    const user = await this.userRepository.create({ profileId, password, documentNumber })

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
