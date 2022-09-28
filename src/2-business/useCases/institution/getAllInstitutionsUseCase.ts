import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { IInstitution } from '#domain/entities/iInstitution'
import { IInstitutionRepository } from '#business/repositories/iInstitutionRepository'

export class GetAllInstitutionsUseCase implements IBaseUseCase<any, IInstitution[]> {
  private institutionRepository!: IInstitutionRepository

  constructor (institutionRepository: IInstitutionRepository) {
    this.institutionRepository = institutionRepository
  }

  async run (): Promise<IInstitution[]> {
    console.log('start get all institutions use case')

    const institutions = await this.institutionRepository.findAll()

    console.log('institutions: ', institutions)

    return institutions
  }
}
