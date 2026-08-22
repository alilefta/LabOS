import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string(),
  labId: z.string()
}).strict();
export const LabStaffIdLabIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.LabStaffIdLabIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffIdLabIdCompoundUniqueInput>;
export const LabStaffIdLabIdCompoundUniqueInputObjectZodSchema = makeSchema();
