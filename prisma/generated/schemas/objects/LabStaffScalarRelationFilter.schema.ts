import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => LabStaffWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => LabStaffWhereInputObjectSchema).optional()
}).strict();
export const LabStaffScalarRelationFilterObjectSchema: z.ZodType<Prisma.LabStaffScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffScalarRelationFilter>;
export const LabStaffScalarRelationFilterObjectZodSchema = makeSchema();
