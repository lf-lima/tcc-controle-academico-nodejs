export interface UploadFileToSubjectInputDto {
  fileName: string
  fileBuffer: Buffer
  subjectId: number
  professorId: number
}
