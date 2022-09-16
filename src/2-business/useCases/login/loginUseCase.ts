import { IBaseUseCase } from '#business/useCases/base/iBaseUseCase'
import { IUserRepository } from '#business/repositories/iUserRepository'
import { LoginInputDto } from '#business/dto/login/loginInputDto'
import { LoginOutputDto } from '#business/dto/login/loginOutputDto'
import { User } from '#domain/models/user'
import { IStudentRepository } from '#business/repositories/iStudentRepository'
import { IProfessorRepository } from '#business/repositories/iProfessorRepository'
import { IInstitutionRepository } from '#business/repositories/iInstitutionRepository'
import { TokenPayload } from '#domain/models/token'
import { IProfessor } from '#domain/entities/iProfessor'
import { IInstitution } from '#domain/entities/iInstitution'
import Permission from '#framework/models/mysql/permission.model'
import { IUser } from '#domain/entities/iUser'

export class LoginUseCase implements IBaseUseCase<LoginInputDto, LoginOutputDto> {
  private userRepository!: IUserRepository
  private studentRepository!: IStudentRepository
  private professorRepository!: IProfessorRepository
  private institutionRepository!: IInstitutionRepository

  constructor (
    userRepository: IUserRepository,
    studentRepository: IStudentRepository,
    professorRepository: IProfessorRepository,
    institutionRepository: IInstitutionRepository
  ) {
    this.userRepository = userRepository
    this.studentRepository = studentRepository
    this.professorRepository = professorRepository
    this.institutionRepository = institutionRepository
  }

  async run (input: LoginInputDto): Promise<LoginOutputDto> {
    console.log('start login use case: ', input)

    const { password, documentNumber } = input

    const user = await this.userRepository.findByDocumentNumber(documentNumber)

    if (!user) {
      console.error('user not exits')
      throw new Error('User not exists')
    }

    console.log('found user')

    const isValidPassword = User.checkPassword(password, user.password)

    if (!isValidPassword) {
      console.error('is invalid password')
      throw new Error('Is invalid password')
    }

    const token = await this.getPayloadToken(user)

    console.log('generate token to access with success')

    return { token }
  }

  private async getPayloadToken (user: IUser & { permissions: Permission[] }) {
    const userId = user.id
    const permissions = user.permissions

    let tokenPayload: TokenPayload

    let professor: IProfessor | undefined
    let institution: IInstitution | undefined

    const student = await this.studentRepository.findByUserId(userId)

    if (!student) {
      professor = await this.professorRepository.findByUserId(userId)
    }

    if (!professor) {
      institution = await this.institutionRepository.findByUserId(userId)
    }

    if (student) {
      tokenPayload = {
        institutionId: student.institutionId,
        studentId: student.id,
        userId,
        permissions
      }
    } else if (professor) {
      tokenPayload = {
        institutionId: professor.institutionId,
        professorId: professor.id,
        userId,
        permissions
      }
    } else {
      tokenPayload = {
        institutionId: institution?.id as number,
        userId,
        permissions
      }
    }

    return User.genToken(tokenPayload)
  }
}
