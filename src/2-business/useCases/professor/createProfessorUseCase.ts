import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { CreateProfessorInputDto } from '#business/dto/professor/createProfessorInputDto'
import { IProfessor } from '#domain/entities/iProfessor'
import { IProfessorRepository } from '#business/repositories/iProfessorRepository'
import { CreateUserUseCase } from '#business/useCases/user/createUserUseCase'

export class CreateProfessorUseCase implements IBaseUseCase<CreateProfessorInputDto, IProfessor> {
  private professorRepository!: IProfessorRepository
  private createUserUseCase!: CreateUserUseCase

  constructor (professorRepository: IProfessorRepository, createUserUseCase: CreateUserUseCase) {
    this.professorRepository = professorRepository
    this.createUserUseCase = createUserUseCase
  }

  async run (input: CreateProfessorInputDto): Promise<IProfessor> {
    console.log('start create professor use case: ', input)

    const { profileId, password, name, institutionId, documentNumber } = input

    const user = await this.createUserUseCase.run({ profileId, password, documentNumber })

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
