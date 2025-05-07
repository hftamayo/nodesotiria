import { EnvironmentConfig } from '../../../config/environment';
import { SeedRolesCommand } from '../../../services/commands/dataseeding/seedRolesCommand';
import { SeedUsersCommand } from '../../../services/commands/dataseeding/seedUsersCommand';
import { LogExecution } from '../../../decorators/logging';

class SeedDatabase {
  private readonly envConfig: EnvironmentConfig;
  private readonly seedUsersCommand: SeedUsersCommand;
  private readonly seedRolesCommand: SeedRolesCommand;

  constructor() {
    this.envConfig = EnvironmentConfig.getInstance();
    this.seedUsersCommand = new SeedUsersCommand();
    this.seedRolesCommand = new SeedRolesCommand();
  }

  @LogExecution()
  async seed(): Promise<void> {
    const { development, production } = this.envConfig.getSeeding();
    const seedingRequired = development || production;

    try {
      if (seedingRequired) {
        console.log(
          `Seeding database in ${this.envConfig.getMode()} environment`,
        );
        await this.seedRolesCommand.execute();
        await this.seedUsersCommand.execute();
      } else {
        console.log(
          `No seeding required in ${this.envConfig.getMode()} environment`,
        );
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
