import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema'

const makeSchema = () => z.object({
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional()
}).strict();
export const LabSettingsIncludeObjectSchema: z.ZodType<Prisma.LabSettingsInclude> = makeSchema() as unknown as z.ZodType<Prisma.LabSettingsInclude>;
export const LabSettingsIncludeObjectZodSchema = makeSchema();
