import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonCreateManyAddonInputObjectSchema as CaseWorkItemAddonCreateManyAddonInputObjectSchema } from './CaseWorkItemAddonCreateManyAddonInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseWorkItemAddonCreateManyAddonInputObjectSchema), z.lazy(() => CaseWorkItemAddonCreateManyAddonInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseWorkItemAddonCreateManyAddonInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonCreateManyAddonInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonCreateManyAddonInputEnvelope>;
export const CaseWorkItemAddonCreateManyAddonInputEnvelopeObjectZodSchema = makeSchema();
