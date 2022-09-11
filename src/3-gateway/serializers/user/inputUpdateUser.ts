import { IsString, IsEmail, Length, IsOptional, IsNotEmpty, IsInt, IsNumber, Min } from 'class-validator'
import { Match } from '#gateway/serializers/base/decorators'
import { IInputBaseClassValidator, InputBaseClassValidator } from '#gateway/serializers/classValidator/iInputBaseClassValidator'

export interface IInputUpdateUser extends IInputBaseClassValidator{
  userId: number
  email?: string
  password?: string
  confirmPassword?: string
}

export class InputUpdateUser extends InputBaseClassValidator implements IInputUpdateUser {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  public userId!: number

  @IsOptional()
  @IsEmail()
  public email?: string

  @Match('confirmPassword', {
    message: 'Password and confirmPassword are different'
  })
  @IsOptional()
  @IsString()
  @Length(6, 16)
  public password?: string

  @Match('password', {
    message: 'Password and confirmPassword are different'
  })
  @IsOptional()
  @IsString()
  public confirmPassword?: string

  constructor (obj: Partial<InputUpdateUser>) {
    super()
    Object.assign(this, obj)
  }
}
