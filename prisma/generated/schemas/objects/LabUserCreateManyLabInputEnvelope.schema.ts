import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserCreateManyLabInputObjectSchema as LabUserCreateManyLabInputObjectSchema } from './LabUserCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => LabUserCreateManyLabInputObjectSchema), z.lazy(() => LabUserCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const LabUserCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.LabUserCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.LabUserCreateManyLabInputEnvelope>;
export const LabUserCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
