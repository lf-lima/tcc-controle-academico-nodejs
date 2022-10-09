import { IsNotEmpty, IsNumber } from 'class-validator'
import { InputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'

export class InputGetAllStudentsByInstitutionId extends InputBaseValidator {
  @IsNotEmpty()
  @IsNumber()
  institutionId!: number

  constructor (obj: Partial<InputGetAllStudentsByInstitutionId>) {
    super()
    Object.assign(this, obj)
  }
}
