import { IsNotEmpty, IsNumber } from 'class-validator'
import { InputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'

export class InputGetAllProfessorsByInstitutionId extends InputBaseValidator {
  @IsNotEmpty()
  @IsNumber()
  institutionId!: number

  constructor (obj: Partial<InputGetAllProfessorsByInstitutionId>) {
    super()
    Object.assign(this, obj)
  }
}
