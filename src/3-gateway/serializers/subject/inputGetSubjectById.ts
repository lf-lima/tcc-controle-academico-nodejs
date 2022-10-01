import { IsNotEmpty, IsNumber } from 'class-validator'
import { InputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'

export class InputGetSubjectById extends InputBaseValidator {
  @IsNotEmpty()
  @IsNumber()
  subjectId!: number

  constructor (obj: Partial<InputGetSubjectById>) {
    super()
    Object.assign(this, obj)
  }
}
