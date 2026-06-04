import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonCreateManyLabInputObjectSchema as CaseWorkItemAddonCreateManyLabInputObjectSchema } from './CaseWorkItemAddonCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseWorkItemAddonCreateManyLabInputObjectSchema), z.lazy(() => CaseWorkItemAddonCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseWorkItemAddonCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonCreateManyLabInputEnvelope>;
export const CaseWorkItemAddonCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
