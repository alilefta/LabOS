import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSettingsSelectObjectSchema as LabSettingsSelectObjectSchema } from './objects/LabSettingsSelect.schema';
import { LabSettingsIncludeObjectSchema as LabSettingsIncludeObjectSchema } from './objects/LabSettingsInclude.schema';
import { LabSettingsWhereUniqueInputObjectSchema as LabSettingsWhereUniqueInputObjectSchema } from './objects/LabSettingsWhereUniqueInput.schema';
import { LabSettingsCreateInputObjectSchema as LabSettingsCreateInputObjectSchema } from './objects/LabSettingsCreateInput.schema';
import { LabSettingsUncheckedCreateInputObjectSchema as LabSettingsUncheckedCreateInputObjectSchema } from './objects/LabSettingsUncheckedCreateInput.schema';
import { LabSettingsUpdateInputObjectSchema as LabSettingsUpdateInputObjectSchema } from './objects/LabSettingsUpdateInput.schema';
import { LabSettingsUncheckedUpdateInputObjectSchema as LabSettingsUncheckedUpdateInputObjectSchema } from './objects/LabSettingsUncheckedUpdateInput.schema';

export const LabSettingsUpsertOneSchema: z.ZodType<Prisma.LabSettingsUpsertArgs> = z.object({ select: LabSettingsSelectObjectSchema.optional(), include: LabSettingsIncludeObjectSchema.optional(), where: LabSettingsWhereUniqueInputObjectSchema, create: z.union([ LabSettingsCreateInputObjectSchema, LabSettingsUncheckedCreateInputObjectSchema ]), update: z.union([ LabSettingsUpdateInputObjectSchema, LabSettingsUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.LabSettingsUpsertArgs>;

export const LabSettingsUpsertOneZodSchema = z.object({ select: LabSettingsSelectObjectSchema.optional(), include: LabSettingsIncludeObjectSchema.optional(), where: LabSettingsWhereUniqueInputObjectSchema, create: z.union([ LabSettingsCreateInputObjectSchema, LabSettingsUncheckedCreateInputObjectSchema ]), update: z.union([ LabSettingsUpdateInputObjectSchema, LabSettingsUncheckedUpdateInputObjectSchema ]) }).strict();