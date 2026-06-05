import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSettingsCreateManyInputObjectSchema as LabSettingsCreateManyInputObjectSchema } from './objects/LabSettingsCreateManyInput.schema';

export const LabSettingsCreateManySchema: z.ZodType<Prisma.LabSettingsCreateManyArgs> = z.object({ data: z.union([ LabSettingsCreateManyInputObjectSchema, z.array(LabSettingsCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.LabSettingsCreateManyArgs>;

export const LabSettingsCreateManyZodSchema = z.object({ data: z.union([ LabSettingsCreateManyInputObjectSchema, z.array(LabSettingsCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();