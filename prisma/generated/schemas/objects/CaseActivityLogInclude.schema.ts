import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseArgsObjectSchema as CaseArgsObjectSchema } from './CaseArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { LabUserArgsObjectSchema as LabUserArgsObjectSchema } from './LabUserArgs.schema'

const makeSchema = () => z.object({
  dentalCase: z.union([z.boolean(), z.lazy(() => CaseArgsObjectSchema)]).optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  actor: z.union([z.boolean(), z.lazy(() => LabUserArgsObjectSchema)]).optional()
}).strict();
export const CaseActivityLogIncludeObjectSchema: z.ZodType<Prisma.CaseActivityLogInclude> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogInclude>;
export const CaseActivityLogIncludeObjectZodSchema = makeSchema();
