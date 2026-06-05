import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSettingsSelectObjectSchema as LabSettingsSelectObjectSchema } from './objects/LabSettingsSelect.schema';
import { LabSettingsIncludeObjectSchema as LabSettingsIncludeObjectSchema } from './objects/LabSettingsInclude.schema';
import { LabSettingsWhereUniqueInputObjectSchema as LabSettingsWhereUniqueInputObjectSchema } from './objects/LabSettingsWhereUniqueInput.schema';

export const LabSettingsFindUniqueSchema: z.ZodType<Prisma.LabSettingsFindUniqueArgs> = z.object({ select: LabSettingsSelectObjectSchema.optional(), include: LabSettingsIncludeObjectSchema.optional(), where: LabSettingsWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.LabSettingsFindUniqueArgs>;

export const LabSettingsFindUniqueZodSchema = z.object({ select: LabSettingsSelectObjectSchema.optional(), include: LabSettingsIncludeObjectSchema.optional(), where: LabSettingsWhereUniqueInputObjectSchema }).strict();