import Admin from '#framework/models/mysql/admin.model'
import Profile from '#framework/models/mysql/profile.model'
import User from '#framework/models/mysql/user.model'

export default async function insertDefaultAdminUser (): Promise<void> {
  const adminProfile = await Profile.findOne({ where: { name: 'admin' }})

  const newUser = await User.create({ documentNumber: '1234', password: 'test1234', profileId: adminProfile?.id } as User)

  await Admin.create({ name: 'Luiz', userId: newUser.id } as Admin)
}
