import { PartialBy } from '#business/utils/partialBy'
import { IProfessorRepository } from '#business/repositories/iProfessorRepository'
import { IProfessor } from '#domain/entities/iProfessor'
import Professor from '#framework/models/mysql/professor.model'

export class ProfessorRepository implements IProfessorRepository {
  private readonly repo: typeof Professor = Professor

  async create (data: PartialBy<IProfessor, 'id'>): Promise<IProfessor> {
    return await this.repo.create(data as Professor)
  }
}
