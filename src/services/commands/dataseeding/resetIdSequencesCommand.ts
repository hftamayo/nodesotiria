import prisma from '../../../api/v1/prismaClient';
import { SequenceExistsCommand } from './sequenceExistsCommand';

export class ResetIdSequencesCommand {
  private readonly sequenceExistsCommand = new SequenceExistsCommand();

  async execute(sequenceName: string): Promise<void> {
    const exists = await this.sequenceExistsCommand.execute(sequenceName);
    if (exists) {
      await prisma.$executeRawUnsafe(
        `ALTER SEQUENCE "${sequenceName}" RESTART WITH 1`,
      );
    } else {
      console.log(`Sequence "${sequenceName}" does not exist, skipping reset`);
    }
  }
}
