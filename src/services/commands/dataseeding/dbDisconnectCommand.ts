import prisma from '../../../api/v1/prismaClient';

export class DbDisconnectCommand {
  async execute(): Promise<void> {
    await prisma.$disconnect();
  }
}
