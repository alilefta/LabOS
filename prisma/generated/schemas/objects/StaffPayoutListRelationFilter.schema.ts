import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutWhereInputObjectSchema as StaffPayoutWhereInputObjectSchema } from './StaffPayoutWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => StaffPayoutWhereInputObjectSchema).optional(),
  some: z.lazy(() => StaffPayoutWhereInputObjectSchema).optional(),
  none: z.lazy(() => StaffPayoutWhereInputObjectSchema).optional()
}).strict();
export const StaffPayoutListRelationFilterObjectSchema: z.ZodType<Prisma.StaffPayoutListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutListRelationFilter>;
export const StaffPayoutListRelationFilterObjectZodSchema = makeSchema();
