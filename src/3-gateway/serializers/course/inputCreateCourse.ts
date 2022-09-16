import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { InputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'

export class InputCreateCourse extends InputBaseValidator {
  @IsNotEmpty()
  @IsNumber()
  institutionId!: number

  @IsNotEmpty()
  @IsString()
  courseName!: string

  @IsNotEmpty()
  @IsString()
  courseDescription!: string

  constructor (obj: Partial<InputCreateCourse>) {
    super()
    Object.assign(this, obj)
  }
}
