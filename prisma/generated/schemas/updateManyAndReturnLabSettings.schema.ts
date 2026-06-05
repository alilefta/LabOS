import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSettingsSelectObjectSchema as LabSettingsSelectObjectSchema } from './objects/LabSettingsSelect.schema';
import { LabSettingsUpdateManyMutationInputObjectSchema as LabSettingsUpdateManyMutationInputObjectSchema } from './objects/LabSettingsUpdateManyMutationInput.schema';
import { LabSettingsWhereInputObjectSchema as LabSettingsWhereInputObjectSchema } from './objects/LabSettingsWhereInput.schema';

export const LabSettingsUpdateManyAndReturnSchema: z.ZodType<Prisma.LabSettingsUpdateManyAndReturnArgs> = z.object({ select: LabSettingsSelectObjectSchema.optional(), data: LabSettingsUpdateManyMutationInputObjectSchema, where: LabSettingsWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabSettingsUpdateManyAndReturnArgs>;

export const LabSettingsUpdateManyAndReturnZodSchema = z.object({ select: LabSettingsSelectObjectSchema.optional(), data: LabSettingsUpdateManyMutationInputObjectSchema, where: LabSettingsWhereInputObjectSchema.optional() }).strict();