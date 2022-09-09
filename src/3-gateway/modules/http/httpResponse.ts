import { IHttpResponseError } from '../errors/http/httpReponseErrors'

export interface IHttpResponse<TBody> {
  statusCode: number,
  message: string,
  body: TBody,
  hasError: boolean
}
// generic class
class HttpResponse<TBody> implements IHttpResponse<TBody> {
  public statusCode!: number

  public message!: string

  public body!: TBody

  public hasError = false

  constructor (obj: Partial<HttpResponse<TBody>>) {
    Object.assign(this, obj)
  }
}

export type IHttpSuccessReponse<TBody> = IHttpResponse<TBody>
export class HttpSuccessResponse<TBody> extends HttpResponse<TBody> {
  constructor (body: TBody) {
    super({ statusCode: 200, message: 'Success', body })
  }
}

export type IHttpInternalErrorResponse = IHttpResponse<IHttpResponseError[]>
export class HttpInternalErrorResponse extends HttpResponse<IHttpResponseError[]> {
  constructor (errorMessage: string) {
    super({
      statusCode: 500,
      message: 'Server Internal Error',
      hasError: true,
      body: [{
        property: 'internal',
        messages: [
          errorMessage
        ]
      }]
    })
  }
}

export type IHttpUnauthorizedResponse = IHttpResponse<IHttpResponseError[]>
export class HttpUnauthorizedResponse extends HttpResponse<IHttpResponseError[]> {
  constructor (body: IHttpResponseError[]) {
    super({ statusCode: 401, message: 'Unauthorized', hasError: true, body })
  }
}

export type IHttpBadRequestResponse = IHttpResponse<IHttpResponseError[]>
export class HttpBadRequestResponse extends HttpResponse<IHttpResponseError[]> {
  constructor (body: IHttpResponseError[]) {
    super({ statusCode: 400, message: 'Bad Request', hasError: true, body })
  }
}
