import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => LabStaffWhereInputObjectSchema).optional(),
  some: z.lazy(() => LabStaffWhereInputObjectSchema).optional(),
  none: z.lazy(() => LabStaffWhereInputObjectSchema).optional()
}).strict();
export const LabStaffListRelationFilterObjectSchema: z.ZodType<Prisma.LabStaffListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffListRelationFilter>;
export const LabStaffListRelationFilterObjectZodSchema = makeSchema();
