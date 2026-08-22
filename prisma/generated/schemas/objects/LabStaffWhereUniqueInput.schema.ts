import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffIdLabIdCompoundUniqueInputObjectSchema as LabStaffIdLabIdCompoundUniqueInputObjectSchema } from './LabStaffIdLabIdCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  memberId: z.string().optional(),
  id_labId: z.lazy(() => LabStaffIdLabIdCompoundUniqueInputObjectSchema).optional()
}).strict();
export const LabStaffWhereUniqueInputObjectSchema: z.ZodType<Prisma.LabStaffWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffWhereUniqueInput>;
export const LabStaffWhereUniqueInputObjectZodSchema = makeSchema();
