import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'
import { Match } from '#gateway/serializers/base/decorators'
import { InputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'

export class InputCreateStudent extends InputBaseValidator {
  @IsNotEmpty()
  @IsNumber()
  institutionId!: number

  @IsNotEmpty()
  @IsString()
  documentNumber!: string

  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsNumber()
  courseId!: number

  @IsNotEmpty()
  @IsString()
  @Length(6, 16)
  public password!: string

  @IsNotEmpty()
  @IsString()
  @Match('password', {
    message: 'Password and confirmPassword are different'
  })
  public confirmPassword!: string

  constructor (obj: Partial<InputCreateStudent>) {
    super()
    Object.assign(this, obj)
  }
}
