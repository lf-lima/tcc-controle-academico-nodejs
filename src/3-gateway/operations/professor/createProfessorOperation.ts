import {
  HttpInternalErrorResponse,
  HttpOkResponse,
  IHttpResponse
} from '#gateway/modules/http/httpResponse'
import { CreateInstitutionUseCase } from '#business/useCases/institution/createInstitutionUseCase'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'
import { IInstitution } from '#domain/entities/iInstitution'
import { InputCreateInstitution } from '#gateway/serializers/institution/inputCreateInstitution'

export class CreateProfessorOperation implements IBaseOperation<InputCreateInstitution, IInstitution> {
  private createInstitutionUseCase!: CreateInstitutionUseCase

  constructor (createUserUseCase: CreateInstitutionUseCase) {
    this.createInstitutionUseCase = createUserUseCase
  }

  async run (input: InputCreateInstitution): Promise<IHttpResponse<IInstitution>> {
    try {
      console.log('start create institution operation, input: ', input)

      const institution = await this.createInstitutionUseCase.run(input)

      console.log('created institution: ', institution)

      return new HttpOkResponse(institution)
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
