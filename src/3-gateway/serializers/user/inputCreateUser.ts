import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator'
import { Match } from '#gateway/serializers/base/decorators'
import { IInputBaseClassValidator, InputBaseClassValidator } from '#gateway/serializers/classValidator/iInputBaseClassValidator'

export interface IInputCreateUser extends IInputBaseClassValidator{
  email: string
  password: string
  confirmPassword: string
}

export class InputCreateUser extends InputBaseClassValidator implements IInputCreateUser {
  @IsNotEmpty()
  @IsEmail()
  public email!: string

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

  constructor (obj: Partial<InputCreateUser>) {
    super()
    Object.assign(this, obj)
  }
}
