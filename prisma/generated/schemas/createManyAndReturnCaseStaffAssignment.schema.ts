import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseStaffAssignmentSelectObjectSchema as CaseStaffAssignmentSelectObjectSchema } from './objects/CaseStaffAssignmentSelect.schema';
import { CaseStaffAssignmentCreateManyInputObjectSchema as CaseStaffAssignmentCreateManyInputObjectSchema } from './objects/CaseStaffAssignmentCreateManyInput.schema';

export const CaseStaffAssignmentCreateManyAndReturnSchema: z.ZodType<Prisma.CaseStaffAssignmentCreateManyAndReturnArgs> = z.object({ select: CaseStaffAssignmentSelectObjectSchema.optional(), data: z.union([ CaseStaffAssignmentCreateManyInputObjectSchema, z.array(CaseStaffAssignmentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CaseStaffAssignmentCreateManyAndReturnArgs>;

export const CaseStaffAssignmentCreateManyAndReturnZodSchema = z.object({ select: CaseStaffAssignmentSelectObjectSchema.optional(), data: z.union([ CaseStaffAssignmentCreateManyInputObjectSchema, z.array(CaseStaffAssignmentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();