import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { CreateInstitutionInputDto } from '#business/dto/institution/createInstitutionInputDto'
import { IInstitution } from '#domain/entities/iInstitution'
import { IInstitutionRepository } from '#business/repositories/iInstitutionRepository'
import { CreateUserUseCase } from '#business/useCases/user/createUserUseCase'
import { IProfileRepository } from '#business/repositories/iProfileRepository'
import { ProfileName } from '#domain/enums/profileName'

export class CreateInstitutionUseCase implements IBaseUseCase<CreateInstitutionInputDto, IInstitution> {
  private institutionRepository!: IInstitutionRepository
  private profileRepository!: IProfileRepository
  private createUserUseCase!: CreateUserUseCase

  constructor (
    institutionRepository: IInstitutionRepository,
    profileRepository: IProfileRepository,
    createUserUseCase: CreateUserUseCase) {
    this.institutionRepository = institutionRepository
    this.profileRepository = profileRepository
    this.createUserUseCase = createUserUseCase
  }

  async run (input: CreateInstitutionInputDto): Promise<IInstitution> {
    console.log('start create institution use case: ', input)

    const { password, documentNumber, name, about } = input

    const profile = await this.profileRepository.findByName(ProfileName.INSTITUTION)

    if (!profile) {
      console.error(`Profile don't exists`)
      throw new Error(`Profile don't exists`)
    }

    const user = await this.createUserUseCase.run({ profileId: profile.id, password, documentNumber })

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
