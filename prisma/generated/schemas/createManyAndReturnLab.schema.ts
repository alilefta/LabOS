import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSelectObjectSchema as LabSelectObjectSchema } from './objects/LabSelect.schema';
import { LabCreateManyInputObjectSchema as LabCreateManyInputObjectSchema } from './objects/LabCreateManyInput.schema';

export const LabCreateManyAndReturnSchema: z.ZodType<Prisma.LabCreateManyAndReturnArgs> = z.object({ select: LabSelectObjectSchema.optional(), data: z.union([ LabCreateManyInputObjectSchema, z.array(LabCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.LabCreateManyAndReturnArgs>;

export const LabCreateManyAndReturnZodSchema = z.object({ select: LabSelectObjectSchema.optional(), data: z.union([ LabCreateManyInputObjectSchema, z.array(LabCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();