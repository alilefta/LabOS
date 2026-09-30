import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  caseAssetFileId: z.string(),
  versionNumber: z.number().int()
}).strict();
export const CaseAssetFileVersionCaseAssetFileIdVersionNumberCompoundUniqueInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionCaseAssetFileIdVersionNumberCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionCaseAssetFileIdVersionNumberCompoundUniqueInput>;
export const CaseAssetFileVersionCaseAssetFileIdVersionNumberCompoundUniqueInputObjectZodSchema = makeSchema();
