import SeedRoles from '../../../shared/utils/dataseed/SeedRoles';

export class SeedRolesCommand {
  async execute(): Promise<void> {
    const seedRolesInstance = new SeedRoles();
    await seedRolesInstance.seedRoles();
  }
}
