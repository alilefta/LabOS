import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonCreateManyCaseWorkItemInputObjectSchema as CaseWorkItemAddonCreateManyCaseWorkItemInputObjectSchema } from './CaseWorkItemAddonCreateManyCaseWorkItemInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CaseWorkItemAddonCreateManyCaseWorkItemInputObjectSchema), z.lazy(() => CaseWorkItemAddonCreateManyCaseWorkItemInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CaseWorkItemAddonCreateManyCaseWorkItemInputEnvelopeObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonCreateManyCaseWorkItemInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonCreateManyCaseWorkItemInputEnvelope>;
export const CaseWorkItemAddonCreateManyCaseWorkItemInputEnvelopeObjectZodSchema = makeSchema();
