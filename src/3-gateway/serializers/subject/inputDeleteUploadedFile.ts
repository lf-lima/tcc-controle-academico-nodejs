import { IsNotEmpty, IsNumber } from 'class-validator'
import { InputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'

export class InputDeleteUploadedFile extends InputBaseValidator {
  @IsNotEmpty()
  @IsNumber()
  uploadedFileId!: number

  constructor (obj: Partial<InputDeleteUploadedFile>) {
    super()
    Object.assign(this, obj)
  }
}
