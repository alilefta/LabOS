import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeCreateManyLabInputObjectSchema as WorkTypeCreateManyLabInputObjectSchema } from './WorkTypeCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => WorkTypeCreateManyLabInputObjectSchema), z.lazy(() => WorkTypeCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const WorkTypeCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.WorkTypeCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCreateManyLabInputEnvelope>;
export const WorkTypeCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
