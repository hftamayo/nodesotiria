import SeedUsers from '../../../shared/utils/dataseed/SeedUsers';

export class SeedUsersCommand {
  async execute(): Promise<void> {
    const seedRolesInstance = new SeedUsers();
    await seedRolesInstance.seedRoles();
  }
}
