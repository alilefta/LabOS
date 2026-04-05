import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabStaffCreateManyInputObjectSchema as LabStaffCreateManyInputObjectSchema } from './objects/LabStaffCreateManyInput.schema';

export const LabStaffCreateManySchema: z.ZodType<Prisma.LabStaffCreateManyArgs> = z.object({ data: z.union([ LabStaffCreateManyInputObjectSchema, z.array(LabStaffCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.LabStaffCreateManyArgs>;

export const LabStaffCreateManyZodSchema = z.object({ data: z.union([ LabStaffCreateManyInputObjectSchema, z.array(LabStaffCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();