import { IBaseEntity } from '#domain/entities/iBaseEntity'
import { IHttpResponseError } from '#gateway/modules/errors/http/httpResponseErrors'
import { IHttpResponse } from '#gateway/modules/http/httpResponse'
import { IInputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'
import { Request, Response } from 'express'

export interface IBaseOperationAdapter {
  adapt(Input?: IInputBaseValidator): (req: Request, res: Response) => Promise<Response<IHttpResponse<IBaseEntity | IHttpResponseError[]>>>
}
