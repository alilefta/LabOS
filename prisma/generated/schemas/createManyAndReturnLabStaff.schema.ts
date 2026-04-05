import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabStaffSelectObjectSchema as LabStaffSelectObjectSchema } from './objects/LabStaffSelect.schema';
import { LabStaffCreateManyInputObjectSchema as LabStaffCreateManyInputObjectSchema } from './objects/LabStaffCreateManyInput.schema';

export const LabStaffCreateManyAndReturnSchema: z.ZodType<Prisma.LabStaffCreateManyAndReturnArgs> = z.object({ select: LabStaffSelectObjectSchema.optional(), data: z.union([ LabStaffCreateManyInputObjectSchema, z.array(LabStaffCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.LabStaffCreateManyAndReturnArgs>;

export const LabStaffCreateManyAndReturnZodSchema = z.object({ select: LabStaffSelectObjectSchema.optional(), data: z.union([ LabStaffCreateManyInputObjectSchema, z.array(LabStaffCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();