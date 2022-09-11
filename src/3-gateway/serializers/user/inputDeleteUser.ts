import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator'
import { InputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'

export class InputDeleteUser extends InputBaseValidator {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  public userId!: number

  constructor (obj: Partial<InputDeleteUser>) {
    super()
    Object.assign(this, obj)
  }
}
