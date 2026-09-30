import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  organizationId: z.string(),
  storedFileId: z.string(),
  versionNumber: z.number().int(),
  createdByMemberId: z.string().optional().nullable(),
  createdByMemberIdSnapshot: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();
export const CaseAssetFileVersionCreateManyAssetInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionCreateManyAssetInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionCreateManyAssetInput>;
export const CaseAssetFileVersionCreateManyAssetInputObjectZodSchema = makeSchema();
