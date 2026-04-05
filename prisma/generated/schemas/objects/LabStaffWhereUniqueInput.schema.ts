import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const LabStaffWhereUniqueInputObjectSchema: z.ZodType<Prisma.LabStaffWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffWhereUniqueInput>;
export const LabStaffWhereUniqueInputObjectZodSchema = makeSchema();
