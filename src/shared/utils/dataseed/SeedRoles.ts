import prisma from '../../../api/v1/prismaClient';
import { IsTableExistsCommand } from '../../../services/commands/dataseeding/isTableExistsCommand';
import { ResetIdSequencesCommand } from '../../../services/commands/dataseeding/resetIdSequencesCommand';
import { DbDisconnectCommand } from '../../../services/commands/dataseeding/dbDisconnectCommand';
import { LogExecution } from '../../../decorators/logging';
import {
  DOMAINS,
  PERMISSIONS,
  SYSTEM_PERMISSIONS,
} from '../../../config/envvars';

const roles = [
  {
    name: 'ADMINISTRATOR',
    description: 'Admin users have full access to all resources',
    status: true,
    permissions: {
      [DOMAINS.USER]: PERMISSIONS.ALL,
      [DOMAINS.ROLE]: PERMISSIONS.ALL,
      [DOMAINS.SYSTEM]: SYSTEM_PERMISSIONS.LOGOUT,
    },
  },
  {
    name: 'SUPERVISOR',
    description: 'Supervisor users have access to most resources',
    status: true,
    permissions: {
      [DOMAINS.USER]: PERMISSIONS.READ | PERMISSIONS.UPDATE, // 5 (0101)
      [DOMAINS.ROLE]: PERMISSIONS.READ, // 1 (0001)
      [DOMAINS.SYSTEM]: SYSTEM_PERMISSIONS.LOGOUT, // 1 (0001)
    },
  },
  {
    name: 'USER',
    description: 'User users have limited access to resources',
    status: true,
    permissions: {
      [DOMAINS.USER]: PERMISSIONS.READ, // 1 (0001) - Can only read their own info
      [DOMAINS.ROLE]: PERMISSIONS.NONE, // 0 (0000) - No role access
      [DOMAINS.SYSTEM]: SYSTEM_PERMISSIONS.LOGOUT, // 1 (0001)
    },
  },
];

class SeedRoles {
  private readonly isTableExistsCommand = new IsTableExistsCommand();
  private readonly resetIdSequencesCommand = new ResetIdSequencesCommand();
  private readonly dbDisconnectCommand = new DbDisconnectCommand();

  @LogExecution()
  async seedRoles(): Promise<void> {
    try {
      const isTablePresent = await this.isTableExistsCommand.execute('Role');
      if (!isTablePresent) {
        console.log('Table "Role" does not exist, skipping seeding');
        return;
      }
      await this.resetIdSequencesCommand.execute('Role_id_seq');
      for (const role of roles) {
        await prisma.role.upsert({
          where: { name: role.name },
          update: {},
          create: role,
        });
      }
      console.log('Roles seeded successfully');
    } catch (error: unknown) {
      console.error('Failed to seed roles', error);
    } finally {
      await this.dbDisconnectCommand.execute();
    }
  }
}
export default SeedRoles;
