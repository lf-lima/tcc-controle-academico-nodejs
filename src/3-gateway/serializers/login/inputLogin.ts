import { IsNotEmpty, IsString } from 'class-validator'
import { InputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'

export class InputLogin extends InputBaseValidator {
  @IsNotEmpty()
  @IsString()
  documentNumber!: string

  @IsNotEmpty()
  @IsString()
  password!: string

  constructor (obj: Partial<InputLogin>) {
    super()
    Object.assign(this, obj)
  }
}
