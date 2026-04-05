import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseStaffAssignmentWhereInputObjectSchema as CaseStaffAssignmentWhereInputObjectSchema } from './objects/CaseStaffAssignmentWhereInput.schema';

export const CaseStaffAssignmentDeleteManySchema: z.ZodType<Prisma.CaseStaffAssignmentDeleteManyArgs> = z.object({ where: CaseStaffAssignmentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseStaffAssignmentDeleteManyArgs>;

export const CaseStaffAssignmentDeleteManyZodSchema = z.object({ where: CaseStaffAssignmentWhereInputObjectSchema.optional() }).strict();