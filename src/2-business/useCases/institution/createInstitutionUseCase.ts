import { IBaseUseCase } from '#business/useCases/base/ibaseUseCase'
import { CreateInstitutionInputDto } from '#business/dto/institution/createInstitutionInputDto'
import { IInstitution } from '#domain/entities/iInstitution'
import { IInstitutionRepository } from '#business/repositories/iInstitutionRepository'
import { IUserRepository } from '#business/repositories/iUserRepository'

export class CreateInstitutionUseCase implements IBaseUseCase<CreateInstitutionInputDto, IInstitution> {
  private institutionRepository!: IInstitutionRepository
  private userRepository!: IUserRepository

  constructor (institutionRepository: IInstitutionRepository, userRepository: IUserRepository) {
    this.institutionRepository = institutionRepository
    this.userRepository = userRepository
  }

  async run (input: CreateInstitutionInputDto): Promise<IInstitution> {
    console.log('start create institution use case: ', input)

    const { profileId, password, documentNumber, name, about } = input

    const user = await this.userRepository.create({ profileId, password })

    console.log('user created: ', user)

    const institution = await this.institutionRepository.create({
      userId: user.id,
      password,
      documentNumber,
      name,
      about,
      profileId
    })

    console.log('institution created: ', institution)

    return institution
  }
}
