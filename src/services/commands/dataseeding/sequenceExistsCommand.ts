import prisma from '../../../api/v1/prismaClient';

export class SequenceExistsCommand {
  async execute(sequenceName: string): Promise<boolean> {
    const result = await prisma.$queryRaw<{ exists: boolean }[]>`
      SELECT EXISTS (
        SELECT FROM information_schema.sequences 
        WHERE sequence_schema = 'public' 
        AND sequence_name = ${sequenceName}
      );
    `;
    return result[0].exists;
  }
}
