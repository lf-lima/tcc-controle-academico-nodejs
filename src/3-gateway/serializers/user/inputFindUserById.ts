import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator'
import { InputBaseClassValidator } from '../classValidator/iInputBaseClassValidator'

export interface IInputFindUserById {
  userId: number
}

export class InputFindUserById extends InputBaseClassValidator implements IInputFindUserById {
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
