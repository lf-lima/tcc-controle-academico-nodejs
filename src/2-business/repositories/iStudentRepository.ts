import { PartialBy } from '#business/utils/partialBy'
import { IStudent } from '#domain/entities/iStudent'

export interface IStudentRepository {
  create(data: PartialBy<IStudent, 'id'>): Promise<IStudent>
}
