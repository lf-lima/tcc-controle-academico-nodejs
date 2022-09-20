export interface IFileStorageService {
  upload(input: { fileName: string; fileExtension: string; fileBuffer: Buffer }): Promise<void>
  getObjectUrl (fileKey: string): Promise<string>
}
