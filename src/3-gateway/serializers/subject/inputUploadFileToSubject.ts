import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { InputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'

export class InputUploadFileToSubject extends InputBaseValidator {
  @IsNotEmpty()
  @IsNumber()
  subjectId!: number

  @IsNotEmpty()
  @IsString()
  fileName!: string

  @IsNotEmpty()
  fileBuffer!: Buffer

  constructor (obj: Partial<InputUploadFileToSubject>) {
    super()
    Object.assign(this, obj)
  }
}
