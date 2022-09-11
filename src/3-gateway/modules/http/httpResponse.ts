import { IHttpResponseError } from '#gateway/modules/errors/http/httpResponseErrors'

export interface IHttpResponse<TBody> {
  statusCode: number,
  message: string,
  body: TBody,
  hasError: boolean
}

class HttpResponse<TBody> implements IHttpResponse<TBody> {
  public statusCode!: number

  public message!: string

  public body!: TBody

  public hasError = false

  constructor (obj: Partial<HttpResponse<TBody>>) {
    Object.assign(this, obj)
  }
}

export class HttpOkResponse<TBody> extends HttpResponse<TBody> {
  constructor (body: TBody) {
    super({ statusCode: 200, message: 'Ok', body })
  }
}

export class HttpInternalErrorResponse extends HttpResponse<IHttpResponseError[]> {
  constructor (error: any) {
    super({
      statusCode: 500,
      message: 'Server Internal Error',
      hasError: true,
      body: [{
        property: 'internal',
        messages: [
          error.message
        ]
      }]
    })
  }
}

export class HttpUnauthorizedResponse extends HttpResponse<IHttpResponseError[]> {
  constructor (body: IHttpResponseError[]) {
    super({ statusCode: 401, message: 'Unauthorized', hasError: true, body })
  }
}

export class HttpBadRequestResponse extends HttpResponse<IHttpResponseError[]> {
  constructor (body: IHttpResponseError[]) {
    super({ statusCode: 400, message: 'Bad Request', hasError: true, body })
  }
}
