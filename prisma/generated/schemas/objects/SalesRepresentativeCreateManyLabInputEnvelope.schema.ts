import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SalesRepresentativeCreateManyLabInputObjectSchema as SalesRepresentativeCreateManyLabInputObjectSchema } from './SalesRepresentativeCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => SalesRepresentativeCreateManyLabInputObjectSchema), z.lazy(() => SalesRepresentativeCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const SalesRepresentativeCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.SalesRepresentativeCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeCreateManyLabInputEnvelope>;
export const SalesRepresentativeCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
