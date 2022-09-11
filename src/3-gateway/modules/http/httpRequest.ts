export interface IHttpRequest<TInput> {
  body: TInput
}

export class HttpRequest<TInput> implements IHttpRequest<TInput> {
  public body!: TInput

  constructor (obj: Partial<HttpRequest<TInput>>) {
    Object.assign(this, obj)
  }
}
