import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { CreateInstitutionInputDto } from '#business/dto/institution/createInstitutionInputDto'
import { IInstitution } from '#domain/entities/iInstitution'
import { IInstitutionRepository } from '#business/repositories/iInstitutionRepository'
import { CreateUserUseCase } from '#business/useCases/user/createUserUseCase'

export class CreateInstitutionUseCase implements IBaseUseCase<CreateInstitutionInputDto, IInstitution> {
  private institutionRepository!: IInstitutionRepository
  private createUserUseCase!: CreateUserUseCase

  constructor (institutionRepository: IInstitutionRepository, createUserUseCase: CreateUserUseCase) {
    this.institutionRepository = institutionRepository
    this.createUserUseCase = createUserUseCase
  }

  async run (input: CreateInstitutionInputDto): Promise<IInstitution> {
    console.log('start create institution use case: ', input)

    const { profileId, password, documentNumber, name, about } = input

    const user = await this.createUserUseCase.run({ profileId, password, documentNumber })

    console.log('user created: ', user)

    const institution = await this.institutionRepository.create({
      userId: user.id,
      name,
      about
    })

    console.log('institution created: ', institution)

    return institution
  }
}
