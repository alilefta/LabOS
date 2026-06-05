import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSettingsWhereInputObjectSchema as LabSettingsWhereInputObjectSchema } from './objects/LabSettingsWhereInput.schema';

export const LabSettingsDeleteManySchema: z.ZodType<Prisma.LabSettingsDeleteManyArgs> = z.object({ where: LabSettingsWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabSettingsDeleteManyArgs>;

export const LabSettingsDeleteManyZodSchema = z.object({ where: LabSettingsWhereInputObjectSchema.optional() }).strict();