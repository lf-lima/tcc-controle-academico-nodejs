import { ExpressRouter } from '#framework/routers/express/expressRouter'
import { CreateSubjectOperation } from '#gateway/operations/subject/createSubjectOperation'
import { CreateSubjectUseCase } from '#business/useCases/subject/createSubjectUseCase'
import { SubjectRepository } from '#framework/repositories/subjectRepository'
import { InputCreateSubject } from '#gateway/serializers/subject/inputCreateSubject'
import { UploadFileToSubjectOperation } from '#gateway/operations/subject/uploadFileToSubjectOperation'
import { UploadFileToSubjectUseCase } from '#business/useCases/subject/uploadFileToSubjectUseCase'
import { UploadService } from '#framework/services/uploadService'
import { InputUploadFileToSubject } from '#gateway/serializers/subject/inputUploadFileToSubject'
import { UploadedFileRepository } from '#framework/repositories/uploadedFileRepository'

export class SubjectRouter extends ExpressRouter {
  constructor () {
    super('/subject', [
      {
        routeName: 'createSubject',
        method: 'post',
        routePath: '',
        input: InputCreateSubject,
        operation: new CreateSubjectOperation(
          new CreateSubjectUseCase(new SubjectRepository())
        ),
        permissions: [
          'createSubject'
        ]
      },
      {
        routeName: 'uploadFileToSubject',
        method: 'post',
        routePath: '/:subjectId/file/upload',
        input: InputUploadFileToSubject,
        inputNormalizer: (httpRequest) => {
          return new InputUploadFileToSubject({
            subjectId: Number(httpRequest.body.subjectId),
            fileName: httpRequest.body.file.originalname,
            fileBuffer: httpRequest.body.file.buffer,
            professorId: Number(httpRequest.body.tokenPayload.professorId)
          })
        },
        operation: new UploadFileToSubjectOperation(
          new UploadFileToSubjectUseCase(new UploadedFileRepository(), new UploadService())
        ),
        options: {
          uploadFileMiddleware: true
        },
        permissions: [
          'uploadFileToSubject'
        ]
      }
    ])
  }
}
