import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSettingsSelectObjectSchema as LabSettingsSelectObjectSchema } from './objects/LabSettingsSelect.schema';
import { LabSettingsCreateManyInputObjectSchema as LabSettingsCreateManyInputObjectSchema } from './objects/LabSettingsCreateManyInput.schema';

export const LabSettingsCreateManyAndReturnSchema: z.ZodType<Prisma.LabSettingsCreateManyAndReturnArgs> = z.object({ select: LabSettingsSelectObjectSchema.optional(), data: z.union([ LabSettingsCreateManyInputObjectSchema, z.array(LabSettingsCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.LabSettingsCreateManyAndReturnArgs>;

export const LabSettingsCreateManyAndReturnZodSchema = z.object({ select: LabSettingsSelectObjectSchema.optional(), data: z.union([ LabSettingsCreateManyInputObjectSchema, z.array(LabSettingsCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();