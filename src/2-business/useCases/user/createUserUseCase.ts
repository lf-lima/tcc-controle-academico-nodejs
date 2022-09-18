import { IBaseUseCase } from '#business/useCases/iBaseUseCase'
import { IUserRepository } from '#business/repositories/iUserRepository'
import { CreateUserInputDto } from '#business/dto/user/createUserInputDto'
import { IUser } from '#domain/entities/iUser'

export class CreateUserUseCase implements IBaseUseCase<CreateUserInputDto, IUser> {
  private userRepository!: IUserRepository

  constructor (userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async run (input: CreateUserInputDto): Promise<IUser> {
    console.log('start create user use case: ', input)

    const { profileId, password, documentNumber } = input

    const existUser = await this.userRepository.findByDocumentNumber(documentNumber)

    if (existUser) {
      console.error('user already exists with this document number ')
      throw new Error('User already exists with this document number')
    }

    const user = await this.userRepository.create({ profileId, password, documentNumber })

    console.log('user created: ', user)

    return user
  }
}
