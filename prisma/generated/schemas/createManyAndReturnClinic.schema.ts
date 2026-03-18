import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ClinicSelectObjectSchema as ClinicSelectObjectSchema } from './objects/ClinicSelect.schema';
import { ClinicCreateManyInputObjectSchema as ClinicCreateManyInputObjectSchema } from './objects/ClinicCreateManyInput.schema';

export const ClinicCreateManyAndReturnSchema: z.ZodType<Prisma.ClinicCreateManyAndReturnArgs> = z.object({ select: ClinicSelectObjectSchema.optional(), data: z.union([ ClinicCreateManyInputObjectSchema, z.array(ClinicCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ClinicCreateManyAndReturnArgs>;

export const ClinicCreateManyAndReturnZodSchema = z.object({ select: ClinicSelectObjectSchema.optional(), data: z.union([ ClinicCreateManyInputObjectSchema, z.array(ClinicCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();