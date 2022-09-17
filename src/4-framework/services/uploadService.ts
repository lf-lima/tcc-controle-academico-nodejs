import { IUploadFileService } from '#business/services/iUploadFileService'
import { S3 } from 'aws-sdk'

export class UploadService implements IUploadFileService {
  private readonly uploader = new S3()
  private readonly bucketName = 'subject-files'

  async upload (input: { fileName: string; fileBuffer: Buffer }): Promise<void> {
    console.log('start upload file, input', input)

    const { fileName, fileBuffer } = input

    console.log(`bucket name: ${this.bucketName}`)

    await this.uploader.putObject({
      Bucket: this.bucketName,
      Key: fileName,
      Body: fileBuffer
    }).promise()

    console.log(`success upload ${fileName}`)
  }
}
