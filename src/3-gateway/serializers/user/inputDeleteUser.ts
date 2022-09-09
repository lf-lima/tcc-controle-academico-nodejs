import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator'
import { InputBaseClassValidator } from '../classValidator/iInputBaseClassValidator'

export interface IInputDeleteUser {
  userId: number
}

export class InputDeleteUser extends InputBaseClassValidator implements IInputDeleteUser {
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
