import {
  HttpInternalErrorResponse,
  HttpOkResponse,
  IHttpResponse
} from '#gateway/modules/http/httpResponse'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'
import { IInstitution } from '#domain/entities/iInstitution'
import { GetAllInstitutionsUseCase } from '#business/useCases/institution/getAllInstitutionsUseCase'

export class GetAllInstitutionsOperation implements IBaseOperation<any, IInstitution[]> {
  private getAllInstitutionsUseCase!: GetAllInstitutionsUseCase

  constructor (getAllInstitutionsUseCase: GetAllInstitutionsUseCase) {
    this.getAllInstitutionsUseCase = getAllInstitutionsUseCase
  }

  async run (): Promise<IHttpResponse<IInstitution[]>> {
    try {
      console.log('start get all institutions operation')

      const institutions = await this.getAllInstitutionsUseCase.run()

      console.log('found institutions: ', institutions)

      return new HttpOkResponse(institutions)
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
