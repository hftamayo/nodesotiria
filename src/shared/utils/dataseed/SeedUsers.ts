import prisma from '../../../api/v1/prismaClient';
import { EnvironmentConfig } from '../../../config/environment';
import { UserSeed } from '../../types/user.type';
import { IsTableExistsCommand } from '../../../services/commands/dataseeding/isTableExistsCommand';
import { ResetIdSequencesCommand } from '../../../services/commands/dataseeding/resetIdSequencesCommand';
import { DbDisconnectCommand } from '../../../services/commands/dataseeding/dbDisconnectCommand';
import { LogExecution } from '../../../decorators/logging';

class SeedUsers {
  private readonly envConfig: EnvironmentConfig;
  private readonly isTableExistsCommand: IsTableExistsCommand;
  private readonly resetIdSequencesCommand: ResetIdSequencesCommand;
  private readonly dbDisconnectCommand: DbDisconnectCommand;

  constructor() {
    this.envConfig = EnvironmentConfig.getInstance();
    this.isTableExistsCommand = new IsTableExistsCommand();
    this.resetIdSequencesCommand = new ResetIdSequencesCommand();
    this.dbDisconnectCommand = new DbDisconnectCommand();
  }

  private getDefaultUsers(): UserSeed[] {
    const { admin, supervisor, user } = this.envConfig.getDefaultPasswords();

    return [
      {
        fullname: 'John Doe',
        birth_date: new Date('1980-01-01'),
        email: 'jdoe@astros.com',
        password: admin,
        status: true,
        roleId: 1,
      },
      {
        fullname: 'Jane Doe',
        birth_date: new Date('1980-01-01'),
        email: 'jane@astros.com',
        password: supervisor,
        status: true,
        roleId: 2,
      },
      {
        fullname: 'Jack Doe',
        birth_date: new Date('1980-01-01'),
        email: 'jack@astros.com',
        password: user,
        status: true,
        roleId: 3,
      },
    ];
  }

  @LogExecution()
  async seedUsers(): Promise<void> {
    try {
      const isTablePresent = await this.isTableExistsCommand.execute('User');
      if (!isTablePresent) {
        console.log('Table "User" does not exist, skipping seeding');
        return;
      }
      await this.resetIdSequencesCommand.execute('User_id_seq');

      const users = this.getDefaultUsers();
      for (const user of users) {
        await prisma.users.upsert({
          where: { email: user.email },
          update: {},
          create: {
            ...user,
            birth_date: user.birth_date,
          },
        });
      }
      console.log('Users seeded successfully');
    } catch (error: unknown) {
      console.error('Failed to seed Users', error);
    } finally {
      await this.dbDisconnectCommand.execute();
    }
  }
}
export default SeedUsers;
