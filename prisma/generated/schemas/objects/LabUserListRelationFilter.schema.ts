import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserWhereInputObjectSchema as LabUserWhereInputObjectSchema } from './LabUserWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => LabUserWhereInputObjectSchema).optional(),
  some: z.lazy(() => LabUserWhereInputObjectSchema).optional(),
  none: z.lazy(() => LabUserWhereInputObjectSchema).optional()
}).strict();
export const LabUserListRelationFilterObjectSchema: z.ZodType<Prisma.LabUserListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.LabUserListRelationFilter>;
export const LabUserListRelationFilterObjectZodSchema = makeSchema();
