import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileCreateManyLabInputObjectSchema as StoredFileCreateManyLabInputObjectSchema } from './StoredFileCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => StoredFileCreateManyLabInputObjectSchema), z.lazy(() => StoredFileCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const StoredFileCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.StoredFileCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileCreateManyLabInputEnvelope>;
export const StoredFileCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
