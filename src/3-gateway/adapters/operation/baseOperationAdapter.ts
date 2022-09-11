import { IBaseEntity } from '#domain/entities/iBaseEntity'
import { IHttpResponseError } from '#gateway/modules/errors/http/httpResponseErrors'
import { IHttpResponse } from '#gateway/modules/http/httpResponse'
import { Request, Response } from 'express'

export interface IBaseOperationAdapter {
  adapt(): (req: Request, res: Response) => Promise<Response<IHttpResponse<IBaseEntity | IHttpResponseError[]>>>
}
