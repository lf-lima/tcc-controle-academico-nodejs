import {
  HttpInternalErrorResponse,
  HttpOkResponse,
  IHttpResponse
} from '#gateway/modules/http/httpResponse'
import { IBaseOperation } from '#gateway/operations/base/iBaseOperation'
import { IProfessor } from '#domain/entities/iProfessor'
import { GetAllProfessorsByInstitutionIdUseCase } from '#business/useCases/professor/getAllProfessorsByInstitutionIdUseCase'
import { InputGetAllProfessorsByInstitutionId } from '#gateway/serializers/professor/inputGetAllProfessorsByInstitutionId'

export class GetAllProfessorsByInstitutionIdOperation implements IBaseOperation<InputGetAllProfessorsByInstitutionId, IProfessor[]> {
  private getAllProfessorsByInstitutionIdUseCase!: GetAllProfessorsByInstitutionIdUseCase

  constructor (getAllProfessorsByInstitutionIdUseCase: GetAllProfessorsByInstitutionIdUseCase) {
    this.getAllProfessorsByInstitutionIdUseCase = getAllProfessorsByInstitutionIdUseCase
  }

  async run (input: InputGetAllProfessorsByInstitutionId): Promise<IHttpResponse<IProfessor[]>> {
    try {
      console.log('start get all professors operation, input: ', input)

      const professors = await this.getAllProfessorsByInstitutionIdUseCase.run(input.institutionId)

      console.log('found professors: ', professors)

      return new HttpOkResponse(professors)
    } catch (error) {
      return new HttpInternalErrorResponse(error)
    }
  }
}
