export interface TokenPayload {
  userId: number
  institutionId?: number
  professorId?: number
  studentId?: number
  username: string
  permissions: string[]
}
