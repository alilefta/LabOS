import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseArgsObjectSchema as CaseArgsObjectSchema } from './CaseArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema'

const makeSchema = () => z.object({
  case: z.union([z.boolean(), z.lazy(() => CaseArgsObjectSchema)]).optional(),
  Lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional()
}).strict();
export const CaseAssetFileIncludeObjectSchema: z.ZodType<Prisma.CaseAssetFileInclude> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileInclude>;
export const CaseAssetFileIncludeObjectZodSchema = makeSchema();
