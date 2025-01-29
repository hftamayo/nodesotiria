import seedRoles from '../../shared/utils/dataseed/seedRoles';

export class SeedRolesCommand {
  async execute(): Promise<void> {
    await seedRoles();
  }
}
