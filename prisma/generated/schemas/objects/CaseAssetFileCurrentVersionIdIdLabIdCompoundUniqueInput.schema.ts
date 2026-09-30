import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  currentVersionId: z.string(),
  id: z.string(),
  labId: z.string()
}).strict();
export const CaseAssetFileCurrentVersionIdIdLabIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.CaseAssetFileCurrentVersionIdIdLabIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCurrentVersionIdIdLabIdCompoundUniqueInput>;
export const CaseAssetFileCurrentVersionIdIdLabIdCompoundUniqueInputObjectZodSchema = makeSchema();
