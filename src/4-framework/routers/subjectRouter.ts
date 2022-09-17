import { ExpressRouter } from '#framework/routers/express/expressRouter'
import { CreateSubjectOperation } from '#gateway/operations/subject/createSubjectOperation'
import { CreateSubjectUseCase } from '#business/useCases/subject/createSubjectUseCase'
import { SubjectRepository } from '#framework/repositories/subjectRepository'
import { InputCreateSubject } from '#gateway/serializers/subject/inputCreateSubject'
import { UploadFileToSubjectOperation } from '#gateway/operations/subject/uploadFileToSubjectOperation'
import { UploadFileToSubjectUseCase } from '#business/useCases/subject/uploadFileToSubjectUseCase'
import { UploadService } from '#framework/services/uploadService'
import { InputUploadFileToSubject } from '#gateway/serializers/subject/inputUploadFileToSubject'

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
        routeName: 'uploadToSubject',
        method: 'post',
        routePath: '/:subjectId/uploadFile',
        input: InputUploadFileToSubject,
        inputNormalizer: (httpRequest) => {
          console.log(httpRequest)
          return new InputUploadFileToSubject({
            subjectId: Number(httpRequest.body.subjectId),
            fileName: httpRequest.body.file.originalname,
            fileBuffer: httpRequest.body.file.buffer
          })
        },
        operation: new UploadFileToSubjectOperation(
          new UploadFileToSubjectUseCase(new SubjectRepository(), new UploadService())
        ),
        options: {
          uploadFileMiddleware: true
        }
      }
    ])
  }
}
