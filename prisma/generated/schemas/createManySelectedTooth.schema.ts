import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SelectedToothCreateManyInputObjectSchema as SelectedToothCreateManyInputObjectSchema } from './objects/SelectedToothCreateManyInput.schema';

export const SelectedToothCreateManySchema: z.ZodType<Prisma.SelectedToothCreateManyArgs> = z.object({ data: z.union([ SelectedToothCreateManyInputObjectSchema, z.array(SelectedToothCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.SelectedToothCreateManyArgs>;

export const SelectedToothCreateManyZodSchema = z.object({ data: z.union([ SelectedToothCreateManyInputObjectSchema, z.array(SelectedToothCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();