import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string(),
  caseAssetFileId: z.string(),
  labId: z.string()
}).strict();
export const CaseAssetFileVersionIdCaseAssetFileIdLabIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionIdCaseAssetFileIdLabIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionIdCaseAssetFileIdLabIdCompoundUniqueInput>;
export const CaseAssetFileVersionIdCaseAssetFileIdLabIdCompoundUniqueInputObjectZodSchema = makeSchema();
