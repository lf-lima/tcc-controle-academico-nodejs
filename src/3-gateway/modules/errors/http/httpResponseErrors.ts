export interface IHttpResponseError {
  property: string,
  messages: string[]
}

export class HttpResponseError implements IHttpResponseError {
  public property!: string
  public messages!: string[]

  constructor (obj: Partial<HttpResponseError>) {
    Object.assign(this, obj)
  }
}
