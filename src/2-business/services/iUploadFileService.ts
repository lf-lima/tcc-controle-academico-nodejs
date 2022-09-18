export interface IUploadFileService {
  upload(input: { fileName: string, fileBuffer: Buffer }): Promise<string>
  getObjectUrl (fileName: string): string
}
