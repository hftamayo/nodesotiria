import SeedUsers from '../../../shared/utils/dataseed/SeedUsers';

export class SeedUsersCommand {
  async execute(): Promise<void> {
    const seedUsersInstance = new SeedUsers();
    await seedUsersInstance.seedUsers();
  }
}
