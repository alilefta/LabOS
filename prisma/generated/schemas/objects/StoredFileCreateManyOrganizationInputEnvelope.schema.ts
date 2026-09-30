import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileCreateManyOrganizationInputObjectSchema as StoredFileCreateManyOrganizationInputObjectSchema } from './StoredFileCreateManyOrganizationInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => StoredFileCreateManyOrganizationInputObjectSchema), z.lazy(() => StoredFileCreateManyOrganizationInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const StoredFileCreateManyOrganizationInputEnvelopeObjectSchema: z.ZodType<Prisma.StoredFileCreateManyOrganizationInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileCreateManyOrganizationInputEnvelope>;
export const StoredFileCreateManyOrganizationInputEnvelopeObjectZodSchema = makeSchema();
