import { IFileStorageService } from '#business/services/iFileStorageService'
import { S3 } from 'aws-sdk'

export class FileStorageService implements IFileStorageService {
  private readonly uploader = new S3({
    signatureVersion: 'v4'
  })
  private readonly bucketName = 'subject-files'
  private readonly downloadUrlExpirationInSeconds = 15 * 60

  async upload (input: { fileName: string; fileExtension: string; fileBuffer: Buffer }): Promise<void> {
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

  async getObjectUrl (fileKey: string): Promise<string> {
    console.log('start get object url')

    const signedUrl = await this.uploader.getSignedUrlPromise('getObject', {
      Bucket: this.bucketName,
      Key: fileKey,
      Expires: this.downloadUrlExpirationInSeconds
    })

    console.log(`download url of ${fileKey} is ${signedUrl}`)

    return signedUrl
  }
}
