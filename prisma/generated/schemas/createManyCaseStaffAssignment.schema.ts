import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseStaffAssignmentCreateManyInputObjectSchema as CaseStaffAssignmentCreateManyInputObjectSchema } from './objects/CaseStaffAssignmentCreateManyInput.schema';

export const CaseStaffAssignmentCreateManySchema: z.ZodType<Prisma.CaseStaffAssignmentCreateManyArgs> = z.object({ data: z.union([ CaseStaffAssignmentCreateManyInputObjectSchema, z.array(CaseStaffAssignmentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CaseStaffAssignmentCreateManyArgs>;

export const CaseStaffAssignmentCreateManyZodSchema = z.object({ data: z.union([ CaseStaffAssignmentCreateManyInputObjectSchema, z.array(CaseStaffAssignmentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();