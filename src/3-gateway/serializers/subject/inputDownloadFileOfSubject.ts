import { IsNotEmpty, IsNumber } from 'class-validator'
import { InputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'

export class InputDownloadFileFromSubject extends InputBaseValidator {
  @IsNotEmpty()
  @IsNumber()
  uploadedFileId!: number

  constructor (obj: Partial<InputDownloadFileFromSubject>) {
    super()
    Object.assign(this, obj)
  }
}
