import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSettingsUpdateManyMutationInputObjectSchema as LabSettingsUpdateManyMutationInputObjectSchema } from './objects/LabSettingsUpdateManyMutationInput.schema';
import { LabSettingsWhereInputObjectSchema as LabSettingsWhereInputObjectSchema } from './objects/LabSettingsWhereInput.schema';

export const LabSettingsUpdateManySchema: z.ZodType<Prisma.LabSettingsUpdateManyArgs> = z.object({ data: LabSettingsUpdateManyMutationInputObjectSchema, where: LabSettingsWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabSettingsUpdateManyArgs>;

export const LabSettingsUpdateManyZodSchema = z.object({ data: LabSettingsUpdateManyMutationInputObjectSchema, where: LabSettingsWhereInputObjectSchema.optional() }).strict();