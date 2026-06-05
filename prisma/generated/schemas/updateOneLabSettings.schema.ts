import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSettingsSelectObjectSchema as LabSettingsSelectObjectSchema } from './objects/LabSettingsSelect.schema';
import { LabSettingsIncludeObjectSchema as LabSettingsIncludeObjectSchema } from './objects/LabSettingsInclude.schema';
import { LabSettingsUpdateInputObjectSchema as LabSettingsUpdateInputObjectSchema } from './objects/LabSettingsUpdateInput.schema';
import { LabSettingsUncheckedUpdateInputObjectSchema as LabSettingsUncheckedUpdateInputObjectSchema } from './objects/LabSettingsUncheckedUpdateInput.schema';
import { LabSettingsWhereUniqueInputObjectSchema as LabSettingsWhereUniqueInputObjectSchema } from './objects/LabSettingsWhereUniqueInput.schema';

export const LabSettingsUpdateOneSchema: z.ZodType<Prisma.LabSettingsUpdateArgs> = z.object({ select: LabSettingsSelectObjectSchema.optional(), include: LabSettingsIncludeObjectSchema.optional(), data: z.union([LabSettingsUpdateInputObjectSchema, LabSettingsUncheckedUpdateInputObjectSchema]), where: LabSettingsWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.LabSettingsUpdateArgs>;

export const LabSettingsUpdateOneZodSchema = z.object({ select: LabSettingsSelectObjectSchema.optional(), include: LabSettingsIncludeObjectSchema.optional(), data: z.union([LabSettingsUpdateInputObjectSchema, LabSettingsUncheckedUpdateInputObjectSchema]), where: LabSettingsWhereUniqueInputObjectSchema }).strict();