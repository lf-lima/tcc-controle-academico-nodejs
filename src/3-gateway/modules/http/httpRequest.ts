export interface IHttpRequest {
  body: any
}

export class HttpRequest implements IHttpRequest {
  public body!: any

  constructor (obj: Partial<HttpRequest>) {
    Object.assign(this, obj)
  }
}
