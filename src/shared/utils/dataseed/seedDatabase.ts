import { mode, dataseeddev, dataseedprod } from '../../../config/envvars';
import { SeedRolesCommand } from '../../../services/commands/dataseeding/seedRolesCommand';
import { SeedUsersCommand } from '../../../services/commands/dataseeding/seedUsersCommand';
import { LogExecution } from '../../../decorators/logging';

class SeedDatabase {
  private readonly seedUsersCommand = new SeedUsersCommand();
  private readonly seedRolesCommand = new SeedRolesCommand();

  @LogExecution()
  async seed(): Promise<void> {
    const seedingRequired = dataseeddev === 'true' || dataseedprod === 'true';

    try {
      if (seedingRequired) {
        console.log(`Seeding database in ${mode} environment`);
        await this.seedRolesCommand.execute();
        await this.seedUsersCommand.execute();
      } else {
        console.log(`No seeding required in ${mode} environment`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error seeding database: ', error.message);
      } else {
        console.error('Error seeding database: ', error);
      }
      process.exit(1);
    }
  }
}

export default SeedDatabase;
