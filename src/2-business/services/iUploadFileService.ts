export interface IUploadFileService {
  upload(input: { fileName: string, fileBuffer: Buffer }): Promise<void>
}
