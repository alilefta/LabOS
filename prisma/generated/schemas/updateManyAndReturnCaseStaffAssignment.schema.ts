import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseStaffAssignmentSelectObjectSchema as CaseStaffAssignmentSelectObjectSchema } from './objects/CaseStaffAssignmentSelect.schema';
import { CaseStaffAssignmentUpdateManyMutationInputObjectSchema as CaseStaffAssignmentUpdateManyMutationInputObjectSchema } from './objects/CaseStaffAssignmentUpdateManyMutationInput.schema';
import { CaseStaffAssignmentWhereInputObjectSchema as CaseStaffAssignmentWhereInputObjectSchema } from './objects/CaseStaffAssignmentWhereInput.schema';

export const CaseStaffAssignmentUpdateManyAndReturnSchema: z.ZodType<Prisma.CaseStaffAssignmentUpdateManyAndReturnArgs> = z.object({ select: CaseStaffAssignmentSelectObjectSchema.optional(), data: CaseStaffAssignmentUpdateManyMutationInputObjectSchema, where: CaseStaffAssignmentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUpdateManyAndReturnArgs>;

export const CaseStaffAssignmentUpdateManyAndReturnZodSchema = z.object({ select: CaseStaffAssignmentSelectObjectSchema.optional(), data: CaseStaffAssignmentUpdateManyMutationInputObjectSchema, where: CaseStaffAssignmentWhereInputObjectSchema.optional() }).strict();