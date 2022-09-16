import insertDefaultAdminUser from '#framework/migrations/seeders/insertDefaultAdminUser'
import populateProfilesAndPermissions from '#framework/migrations/seeders/populateProfilesAndPermissions'

export class Seeder {
  private readonly seeds = [
    populateProfilesAndPermissions,
    insertDefaultAdminUser
  ]

  async run(): Promise<void> {
    for (const seed of this.seeds) {
      await seed()
    }
  }
}
