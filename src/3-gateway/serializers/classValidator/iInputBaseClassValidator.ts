import { validate } from 'class-validator'
import { IUser } from '../../../1-domain/entities/iUser'
import { IHttpResponseError } from '../../modules/errors/http/httpReponseErrors'
import { IInputBase } from '../base/iInputBase'

export type IInputBaseClassValidator = IInputBase<IHttpResponseError>

export class InputBaseClassValidator implements IInputBaseClassValidator {
  public hasError = false

  public async validate (): Promise<IHttpResponseError[]> {
    const httpResponseErrors: IHttpResponseError[] = []

    await validate(this, {
      validationError: {
        target: false,
        value: false
      }
    }).then(errors => {
      for (const error of errors) {
        const messages: string[] = []

        const constraints = error.constraints as any
        const keys = Object.keys(constraints)

        for (const key of keys) {
          messages.push(constraints[key])
        }

        httpResponseErrors.push({
          property: error.property,
          messages
        })
      }
    })

    if (httpResponseErrors.length) {
      this.hasError = true
    }

    return httpResponseErrors
  }
}
