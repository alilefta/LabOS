import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSelectObjectSchema as LabSelectObjectSchema } from './objects/LabSelect.schema';
import { LabIncludeObjectSchema as LabIncludeObjectSchema } from './objects/LabInclude.schema';
import { LabUpdateInputObjectSchema as LabUpdateInputObjectSchema } from './objects/LabUpdateInput.schema';
import { LabUncheckedUpdateInputObjectSchema as LabUncheckedUpdateInputObjectSchema } from './objects/LabUncheckedUpdateInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './objects/LabWhereUniqueInput.schema';

export const LabUpdateOneSchema: z.ZodType<Prisma.LabUpdateArgs> = z.object({ select: LabSelectObjectSchema.optional(), include: LabIncludeObjectSchema.optional(), data: z.union([LabUpdateInputObjectSchema, LabUncheckedUpdateInputObjectSchema]), where: LabWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.LabUpdateArgs>;

export const LabUpdateOneZodSchema = z.object({ select: LabSelectObjectSchema.optional(), include: LabIncludeObjectSchema.optional(), data: z.union([LabUpdateInputObjectSchema, LabUncheckedUpdateInputObjectSchema]), where: LabWhereUniqueInputObjectSchema }).strict();