import { IsNotEmpty, IsNumber } from 'class-validator'
import { InputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'

export class InputGetAllUploadedFilesBySubjectId extends InputBaseValidator {
  @IsNotEmpty()
  @IsNumber()
  subjectId!: number

  constructor (obj: Partial<InputGetAllUploadedFilesBySubjectId>) {
    super()
    Object.assign(this, obj)
  }
}
