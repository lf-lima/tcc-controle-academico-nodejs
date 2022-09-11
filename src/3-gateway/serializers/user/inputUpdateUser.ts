import { IsString, IsEmail, Length, IsOptional, IsNotEmpty, IsInt, IsNumber, Min } from 'class-validator'
import { Match } from '#gateway/serializers/base/decorators'
import { InputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'

export class InputUpdateUser extends InputBaseValidator {
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
