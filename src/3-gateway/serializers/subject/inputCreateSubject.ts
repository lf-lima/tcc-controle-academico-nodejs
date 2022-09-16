import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { InputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'

export class InputCreateSubject extends InputBaseValidator {
  @IsNotEmpty()
  @IsNumber()
  courseId!: number

  @IsNotEmpty()
  @IsNumber()
  institutionId!: number

  @IsNotEmpty()
  @IsString()
  subjectName!: string

  @IsNotEmpty()
  @IsString()
  subjectDescription!: string

  @IsNotEmpty()
  @IsNumber()
  professorId!: number

  constructor (obj: Partial<InputCreateSubject>) {
    super()
    Object.assign(this, obj)
  }
}
