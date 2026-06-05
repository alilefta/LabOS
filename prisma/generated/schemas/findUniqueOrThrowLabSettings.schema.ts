import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSettingsSelectObjectSchema as LabSettingsSelectObjectSchema } from './objects/LabSettingsSelect.schema';
import { LabSettingsIncludeObjectSchema as LabSettingsIncludeObjectSchema } from './objects/LabSettingsInclude.schema';
import { LabSettingsWhereUniqueInputObjectSchema as LabSettingsWhereUniqueInputObjectSchema } from './objects/LabSettingsWhereUniqueInput.schema';

export const LabSettingsFindUniqueOrThrowSchema: z.ZodType<Prisma.LabSettingsFindUniqueOrThrowArgs> = z.object({ select: LabSettingsSelectObjectSchema.optional(), include: LabSettingsIncludeObjectSchema.optional(), where: LabSettingsWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.LabSettingsFindUniqueOrThrowArgs>;

export const LabSettingsFindUniqueOrThrowZodSchema = z.object({ select: LabSettingsSelectObjectSchema.optional(), include: LabSettingsIncludeObjectSchema.optional(), where: LabSettingsWhereUniqueInputObjectSchema }).strict();