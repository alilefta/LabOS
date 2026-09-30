import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  caseAssetFileId: z.string(),
  organizationId: z.string(),
  labId: z.string(),
  storedFileId: z.string(),
  versionNumber: z.number().int(),
  createdByMemberIdSnapshot: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();
export const CaseAssetFileVersionCreateManyCreatedByMemberInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionCreateManyCreatedByMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionCreateManyCreatedByMemberInput>;
export const CaseAssetFileVersionCreateManyCreatedByMemberInputObjectZodSchema = makeSchema();
