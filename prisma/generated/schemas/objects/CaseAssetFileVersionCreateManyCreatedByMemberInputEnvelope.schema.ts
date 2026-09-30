import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionCreateManyCreatedByMemberInputObjectSchema as CaseAssetFileVersionCreateManyCreatedByMemberInputObjectSchema } from './CaseAssetFileVersionCreateManyCreatedByMemberInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseAssetFileVersionCreateManyCreatedByMemberInputObjectSchema), z.lazy(() => CaseAssetFileVersionCreateManyCreatedByMemberInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseAssetFileVersionCreateManyCreatedByMemberInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionCreateManyCreatedByMemberInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionCreateManyCreatedByMemberInputEnvelope>;
export const CaseAssetFileVersionCreateManyCreatedByMemberInputEnvelopeObjectZodSchema = makeSchema();
