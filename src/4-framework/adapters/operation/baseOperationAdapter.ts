import { IBaseEntity } from '#domain/entities/iBaseEntity'
import { InputNormalizer } from '#framework/routers/base/iBaseRouter'
import { IHttpResponse } from '#gateway/modules/http/httpResponse'
import { IInputBaseValidator } from '#gateway/serializers/base/inputBaseValidator'
import { Request, Response } from 'express'

export interface BaseInputAdapt {
  Input?: IInputBaseValidator
  inputNormalizer?: InputNormalizer
}

export interface IBaseOperationAdapter {
  adapt(input: BaseInputAdapt): (req: Request, res: Response) => Promise<Response<IHttpResponse<IBaseEntity>>>
}
