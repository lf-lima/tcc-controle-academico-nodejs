import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'
import { Match } from '#gateway/serializers/base/decorators'
import { InputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'

export class InputCreateInstitution extends InputBaseValidator {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsString()
  about!: string

  @IsNotEmpty()
  @IsString()
  email!: string

  @IsNotEmpty()
  @IsNumber()
  userId!: number

  @IsNotEmpty()
  @IsNumber()
  profileId!: number

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

  constructor (obj: Partial<InputCreateInstitution>) {
    super()
    Object.assign(this, obj)
  }
}
