import {
  HttpInternalErrorResponse,
  HttpOkResponse,
  IHttpResponse
} from '#gateway/modules/http/httpResponse'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'
import { IProfessor } from '#domain/entities/iProfessor'
import { CreateProfessorUseCase } from '#business/useCases/professor/createProfessorUseCase'
import { InputCreateProfessor } from '#gateway/serializers/professor/inputCreateProfessor'

export class CreateProfessorOperation implements IBaseOperation<InputCreateProfessor, IProfessor> {
  private createProfessorUseCase!: CreateProfessorUseCase

  constructor (createProfessorUseCase: CreateProfessorUseCase) {
    this.createProfessorUseCase = createProfessorUseCase
  }

  async run (input: InputCreateProfessor): Promise<IHttpResponse<IProfessor>> {
    try {
      console.log('start create professor operation, input: ', input)

      const professor = await this.createProfessorUseCase.run(input)

      console.log('created professor: ', professor)

      return new HttpOkResponse(professor)
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
