import { CreateProfessorInputDto } from '#business/dto/professor/createProfessorInputDto'
import { IProfessor } from '#domain/entities/iProfessor'

export interface IProfessorRepository {
  create(data: CreateProfessorInputDto): Promise<IProfessor>
}
