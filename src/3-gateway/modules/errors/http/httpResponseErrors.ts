export interface IHttpResponseError {
  property: string,
  messages: string[]
}

export class HttpResponseError implements IHttpResponseError {
  public property!: string
  public messages!: string[]

  constructor (obj: HttpResponseError) {
    Object.assign(this, obj)
  }
}
