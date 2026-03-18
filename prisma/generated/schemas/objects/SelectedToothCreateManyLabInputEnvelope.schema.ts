import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SelectedToothCreateManyLabInputObjectSchema as SelectedToothCreateManyLabInputObjectSchema } from './SelectedToothCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => SelectedToothCreateManyLabInputObjectSchema), z.lazy(() => SelectedToothCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const SelectedToothCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.SelectedToothCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothCreateManyLabInputEnvelope>;
export const SelectedToothCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
