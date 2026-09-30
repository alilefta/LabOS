import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileIdLabIdCompoundUniqueInputObjectSchema as CaseAssetFileIdLabIdCompoundUniqueInputObjectSchema } from './CaseAssetFileIdLabIdCompoundUniqueInput.schema';
import { CaseAssetFileCurrentVersionIdIdLabIdCompoundUniqueInputObjectSchema as CaseAssetFileCurrentVersionIdIdLabIdCompoundUniqueInputObjectSchema } from './CaseAssetFileCurrentVersionIdIdLabIdCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  currentVersionId: z.string().optional(),
  id_labId: z.lazy(() => CaseAssetFileIdLabIdCompoundUniqueInputObjectSchema).optional(),
  currentVersionId_id_labId: z.lazy(() => CaseAssetFileCurrentVersionIdIdLabIdCompoundUniqueInputObjectSchema).optional()
}).strict();
export const CaseAssetFileWhereUniqueInputObjectSchema: z.ZodType<Prisma.CaseAssetFileWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileWhereUniqueInput>;
export const CaseAssetFileWhereUniqueInputObjectZodSchema = makeSchema();
