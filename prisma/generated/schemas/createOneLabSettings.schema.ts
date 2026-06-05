import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSettingsSelectObjectSchema as LabSettingsSelectObjectSchema } from './objects/LabSettingsSelect.schema';
import { LabSettingsIncludeObjectSchema as LabSettingsIncludeObjectSchema } from './objects/LabSettingsInclude.schema';
import { LabSettingsCreateInputObjectSchema as LabSettingsCreateInputObjectSchema } from './objects/LabSettingsCreateInput.schema';
import { LabSettingsUncheckedCreateInputObjectSchema as LabSettingsUncheckedCreateInputObjectSchema } from './objects/LabSettingsUncheckedCreateInput.schema';

export const LabSettingsCreateOneSchema: z.ZodType<Prisma.LabSettingsCreateArgs> = z.object({ select: LabSettingsSelectObjectSchema.optional(), include: LabSettingsIncludeObjectSchema.optional(), data: z.union([LabSettingsCreateInputObjectSchema, LabSettingsUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.LabSettingsCreateArgs>;

export const LabSettingsCreateOneZodSchema = z.object({ select: LabSettingsSelectObjectSchema.optional(), include: LabSettingsIncludeObjectSchema.optional(), data: z.union([LabSettingsCreateInputObjectSchema, LabSettingsUncheckedCreateInputObjectSchema]) }).strict();