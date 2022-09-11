import { validate } from 'class-validator'
import { IHttpResponseError } from '#gateway/modules/errors/http/httpResponseErrors'

export type IInputBaseValidator = new (input: any) => InputBaseValidator

export class InputBaseValidator {
  hasError = false

  constructor (input: Partial<InputBaseValidator> = {}) {
    Object.assign(this, input)
  }

  async validate (): Promise<IHttpResponseError[]> {
    const httpResponseErrors: IHttpResponseError[] = []

    const errors = await validate(this, {
      validationError: {
        target: false,
        value: false
      }
    })

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

    if (httpResponseErrors.length) {
      this.hasError = true
    }

    return httpResponseErrors
  }
}
