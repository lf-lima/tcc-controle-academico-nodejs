import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator'
import { InputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'

export class InputGetAllSubjects extends InputBaseValidator {
  @IsNotEmpty()
  @IsNumber()
  institutionId!: number

  @IsOptional()
  @IsNumber()
  professorId?: number

  @IsOptional()
  @IsNumber()
  studentId?: number

  constructor (obj: Partial<InputGetAllSubjects>) {
    super()
    Object.assign(this, obj)
  }
}
