import { ExpressRouter } from '#framework/routers/express/expressRouter'
import { CreateSubjectOperation } from '#gateway/operations/subject/createSubjectOperation'
import { CreateSubjectUseCase } from '#business/useCases/subject/createSubjectUseCase'
import { SubjectRepository } from '#framework/repositories/subjectRepository'
import { InputCreateSubject } from '#gateway/serializers/subject/inputCreateSubject'
import { UploadFileToSubjectOperation } from '#gateway/operations/subject/uploadFileToSubjectOperation'
import { UploadFileToSubjectUseCase } from '#business/useCases/subject/uploadFileToSubjectUseCase'
import { FileStorageService } from '#framework/services/fileStorageService'
import { InputUploadFileToSubject } from '#gateway/serializers/subject/inputUploadFileToSubject'
import { UploadedFileRepository } from '#framework/repositories/uploadedFileRepository'
import { InputDownloadFileFromSubject } from '#gateway/serializers/subject/inputDownloadFileOfSubject'
import { DownloadFileFromSubjectOperation } from '#gateway/operations/subject/downloadFileFromSubjectOperation'
import { DownloadFileFromSubjectUseCase } from '#business/useCases/subject/downloadFileFromSubjectUseCase'
import { InputGetAllSubjects } from '#gateway/serializers/subject/inputGetAllSubjects'
import { GetAllSubjectsOperation } from '#gateway/operations/subject/getAllSubjectsOperation'
import { GetAllSubjectsByInstitutionIdUseCase } from '#business/useCases/subject/getAllSubjectsByInstitutionIdUseCase'
import { GetAllSubjectsByProfessorIdUseCase } from '#business/useCases/subject/getAllSubjectsByProfessorIdUseCase'
import { GetAllSubjectsByStudentIdUseCase } from '#business/useCases/subject/getAllSubjectsByStudentsIdUseCase'

export class SubjectRouter extends ExpressRouter {
  constructor () {
    super('/subject', [
      {
        routeName: 'createSubject',
        method: 'post',
        routePath: '',
        input: InputCreateSubject,
        inputNormalizer: ({ body }) => new InputCreateSubject({
          ...body,
          institutionId: Number(body.tokenPayload.institutionId ?? body.institutionId)
        }),
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
        inputNormalizer: ({ body }) => new InputUploadFileToSubject({
          subjectId: Number(body.subjectId),
          fileName: body.file.originalname,
          fileBuffer: body.file.buffer,
          professorId: Number(body.tokenPayload.professorId)
        }),
        operation: new UploadFileToSubjectOperation(
          new UploadFileToSubjectUseCase(new UploadedFileRepository(), new FileStorageService())
        ),
        options: {
          uploadFileMiddleware: true
        },
        permissions: [
          'uploadFileToSubject'
        ]
      },
      {
        routeName: 'downloadFileFromSubject',
        method: 'get',
        routePath: '/:subjectId/file/:uploadedFileId/download',
        input: InputDownloadFileFromSubject,
        inputNormalizer: (httpRequest) => {
          return new InputDownloadFileFromSubject({
            uploadedFileId: Number(httpRequest.body.uploadedFileId)
          })
        },
        operation: new DownloadFileFromSubjectOperation(
          new DownloadFileFromSubjectUseCase(new UploadedFileRepository(), new FileStorageService())
        ),
        permissions: [
          'downloadFileFromSubject'
        ]
      },
      {
        routeName: 'getAllSubjects',
        method: 'get',
        routePath: '',
        input: InputGetAllSubjects,
        inputNormalizer: ({ body }) => new InputGetAllSubjects({
          institutionId: Number(body.tokenPayload.institutionId ?? body.institutionId),
          professorId: Number(body.tokenPayload.professorId ?? body.professorId),
          studentId: Number(body.tokenPayload.studentId ?? body.studentId)
        }),
        operation: new GetAllSubjectsOperation(
          new GetAllSubjectsByInstitutionIdUseCase(new SubjectRepository()),
          new GetAllSubjectsByProfessorIdUseCase(new SubjectRepository()),
          new GetAllSubjectsByStudentIdUseCase(new SubjectRepository())
        ),
        permissions: [
          'getAllSubjects'
        ]
      },
    ])
  }
}
