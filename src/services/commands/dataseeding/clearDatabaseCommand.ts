import prisma from '../../../api/v1/prismaClient';

export class ClearDatabaseCommand {
  async execute(): Promise<void> {
    try {
      console.log('Clearing database...');
      await prisma.$executeRawUnsafe(`TRUNCATE "Role" CASCADE`);
      await prisma.$executeRawUnsafe(`TRUNCATE "User" CASCADE`);
      console.log('Database cleared successfully');
    } catch (error: unknown) {
      console.error('Failed to clear database', error);
    } finally {
      await prisma.$disconnect();
    }
  }
}
