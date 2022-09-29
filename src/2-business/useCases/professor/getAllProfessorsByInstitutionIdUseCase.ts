import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { IProfessor } from '#domain/entities/iProfessor'
import { IProfessorRepository } from '#business/repositories/iProfessorRepository'

export class GetAllProfessorsByInstitutionIdUseCase implements IBaseUseCase<number, IProfessor[]> {
  private professorRepository!: IProfessorRepository

  constructor (professorRepository: IProfessorRepository) {
    this.professorRepository = professorRepository
  }

  async run (institutionId: number): Promise<IProfessor[]> {
    console.log('start get all professors use case')

    const professors = await this.professorRepository.findAllByInstitutionId(institutionId)

    console.log('professors: ', professors)

    return professors
  }
}
