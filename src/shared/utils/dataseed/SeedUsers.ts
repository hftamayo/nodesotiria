import prisma from '../../../api/v1/prismaClient';
import { IsTableExistsCommand } from '../../../services/commands/dataseeding/isTableExistsCommand';
import { ResetIdSequencesCommand } from '../../../services/commands/dataseeding/resetIdSequencesCommand';
import { DbDisconnectCommand } from '../../../services/commands/dataseeding/dbDisconnectCommand';
import { LogExecution } from '../../../decorators/logging';

const users = [
  {
    lastname: 'Doe',
    firstname: 'John',
    email: 'jdoe@astros.com',
    password: 'password',
    roleId: 1,
    status: true,
  },
  {
    lastname: 'Doe',
    firstname: 'Jane',
    email: 'jane@astros.com',
    password: 'password',
    roleId: 2,
    status: true,
  },
  {
    lastname: 'Doe',
    firstname: 'Jack',
    email: 'jack@astros.com',
    password: 'password',
    roleId: 3,
    status: true,
  },
];

class SeedUsers {
  private readonly isTableExistsCommand = new IsTableExistsCommand();
  private readonly resetIdSequencesCommand = new ResetIdSequencesCommand();
  private readonly dbDisconnectCommand = new DbDisconnectCommand();

  @LogExecution()
  async seedRoles(): Promise<void> {
    try {
      const isTablePresent = await this.isTableExistsCommand.execute('Role');
      if (!isTablePresent) {
        console.log('Table "User" does not exist, skipping seeding');
        return;
      }
      await this.resetIdSequencesCommand.execute('Role_id_seq');
      for (const user of users) {
        await prisma.role.upsert({
          where: { name: user.email },
          update: {},
          create: user,
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
