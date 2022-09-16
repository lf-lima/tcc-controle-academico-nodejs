import Permission from '#framework/models/mysql/permission.model'
import Profile from '#framework/models/mysql/profile.model'
import ProfilePermission from '#framework/models/mysql/profilePermission.model'

export default async function populateProfilesAndPermissions (): Promise<void> {
  const permissionsToCreate: Permission[] = [
    {
      name: 'createStudent',
      description: 'accept create student'
    },
    {
      name: 'createCourse',
      description: 'accept create course'
    },
    {
      name: 'createSubject',
      description: 'accept create subject'
    },
    {
      name: 'createInstitution',
      description: 'accept create institution'
    },
    {
      name: 'createProfessor',
      description: 'accept create professor'
    }
  ] as any

  await Permission.bulkCreate(permissionsToCreate)

  const profilesToAdd: {
    name: string
    permissions: string[]
  }[] = [
    {
      name: 'admin',
      permissions: [
        'createStudent',
        'createCourse',
        'createSubject',
        'createInstitution',
        'createProfessor'
      ]
    },
    {
      name: 'institution',
      permissions: [
        'createStudent',
        'createCourse',
        'createSubject',
        'createProfessor'
      ]
    },
    {
      name: 'student',
      permissions: []
    },
    {
      name: 'professor',
      permissions: []
    }
  ]

  for (const profile of profilesToAdd) {
    const newProfile = await Profile.create({ name: profile.name } as Profile)

    for (const permissionToProfile of profile.permissions) {
      const permission = await Permission.findOne({ where: { name: permissionToProfile }}) as Permission

      await ProfilePermission.create({ profileId: newProfile.id, permissionId: permission.id } as ProfilePermission)
    }
  }
}
