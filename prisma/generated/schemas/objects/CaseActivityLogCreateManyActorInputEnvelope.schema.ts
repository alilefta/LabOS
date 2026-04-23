import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogCreateManyActorInputObjectSchema as CaseActivityLogCreateManyActorInputObjectSchema } from './CaseActivityLogCreateManyActorInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseActivityLogCreateManyActorInputObjectSchema), z.lazy(() => CaseActivityLogCreateManyActorInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseActivityLogCreateManyActorInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseActivityLogCreateManyActorInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogCreateManyActorInputEnvelope>;
export const CaseActivityLogCreateManyActorInputEnvelopeObjectZodSchema = makeSchema();
