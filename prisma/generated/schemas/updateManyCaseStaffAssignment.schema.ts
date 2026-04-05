import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseStaffAssignmentUpdateManyMutationInputObjectSchema as CaseStaffAssignmentUpdateManyMutationInputObjectSchema } from './objects/CaseStaffAssignmentUpdateManyMutationInput.schema';
import { CaseStaffAssignmentWhereInputObjectSchema as CaseStaffAssignmentWhereInputObjectSchema } from './objects/CaseStaffAssignmentWhereInput.schema';

export const CaseStaffAssignmentUpdateManySchema: z.ZodType<Prisma.CaseStaffAssignmentUpdateManyArgs> = z.object({ data: CaseStaffAssignmentUpdateManyMutationInputObjectSchema, where: CaseStaffAssignmentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUpdateManyArgs>;

export const CaseStaffAssignmentUpdateManyZodSchema = z.object({ data: CaseStaffAssignmentUpdateManyMutationInputObjectSchema, where: CaseStaffAssignmentWhereInputObjectSchema.optional() }).strict();