import IPermission from '#domain/entities/iPermission'

export interface TokenPayload {
  userId: number
  institutionId: number
  professorId?: number
  studentId?: number
  permissions: IPermission[]
}
