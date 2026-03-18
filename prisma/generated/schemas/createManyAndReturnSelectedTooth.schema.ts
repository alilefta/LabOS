import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SelectedToothSelectObjectSchema as SelectedToothSelectObjectSchema } from './objects/SelectedToothSelect.schema';
import { SelectedToothCreateManyInputObjectSchema as SelectedToothCreateManyInputObjectSchema } from './objects/SelectedToothCreateManyInput.schema';

export const SelectedToothCreateManyAndReturnSchema: z.ZodType<Prisma.SelectedToothCreateManyAndReturnArgs> = z.object({ select: SelectedToothSelectObjectSchema.optional(), data: z.union([ SelectedToothCreateManyInputObjectSchema, z.array(SelectedToothCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.SelectedToothCreateManyAndReturnArgs>;

export const SelectedToothCreateManyAndReturnZodSchema = z.object({ select: SelectedToothSelectObjectSchema.optional(), data: z.union([ SelectedToothCreateManyInputObjectSchema, z.array(SelectedToothCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();