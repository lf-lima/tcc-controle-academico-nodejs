import { validate } from 'class-validator'
import { IHttpResponseError } from '#gateway/modules/errors/http/httpResponseErrors'
import { IInputBase } from '#gateway/serializers/base/iInputBase'

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
