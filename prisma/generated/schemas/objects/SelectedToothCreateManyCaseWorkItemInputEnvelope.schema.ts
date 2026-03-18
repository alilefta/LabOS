import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SelectedToothCreateManyCaseWorkItemInputObjectSchema as SelectedToothCreateManyCaseWorkItemInputObjectSchema } from './SelectedToothCreateManyCaseWorkItemInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => SelectedToothCreateManyCaseWorkItemInputObjectSchema), z.lazy(() => SelectedToothCreateManyCaseWorkItemInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const SelectedToothCreateManyCaseWorkItemInputEnvelopeObjectSchema: z.ZodType<Prisma.SelectedToothCreateManyCaseWorkItemInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothCreateManyCaseWorkItemInputEnvelope>;
export const SelectedToothCreateManyCaseWorkItemInputEnvelopeObjectZodSchema = makeSchema();
