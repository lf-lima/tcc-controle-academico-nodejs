import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator'
import { InputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'

export class InputFindUserById extends InputBaseValidator {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  public userId!: number

  constructor (obj: Partial<InputFindUserById>) {
    super()
    Object.assign(this, obj)
  }
}
