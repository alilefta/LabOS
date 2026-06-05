import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSettingsSelectObjectSchema as LabSettingsSelectObjectSchema } from './objects/LabSettingsSelect.schema';
import { LabSettingsIncludeObjectSchema as LabSettingsIncludeObjectSchema } from './objects/LabSettingsInclude.schema';
import { LabSettingsWhereUniqueInputObjectSchema as LabSettingsWhereUniqueInputObjectSchema } from './objects/LabSettingsWhereUniqueInput.schema';

export const LabSettingsDeleteOneSchema: z.ZodType<Prisma.LabSettingsDeleteArgs> = z.object({ select: LabSettingsSelectObjectSchema.optional(), include: LabSettingsIncludeObjectSchema.optional(), where: LabSettingsWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.LabSettingsDeleteArgs>;

export const LabSettingsDeleteOneZodSchema = z.object({ select: LabSettingsSelectObjectSchema.optional(), include: LabSettingsIncludeObjectSchema.optional(), where: LabSettingsWhereUniqueInputObjectSchema }).strict();