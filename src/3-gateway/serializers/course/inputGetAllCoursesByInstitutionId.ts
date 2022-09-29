import { IsNotEmpty, IsNumber } from 'class-validator'
import { InputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'

export class InputGetAllCoursesByInstitutionId extends InputBaseValidator {
  @IsNotEmpty()
  @IsNumber()
  institutionId!: number

  constructor (obj: Partial<InputGetAllCoursesByInstitutionId>) {
    super()
    Object.assign(this, obj)
  }
}
