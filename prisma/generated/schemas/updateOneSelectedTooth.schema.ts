import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SelectedToothSelectObjectSchema as SelectedToothSelectObjectSchema } from './objects/SelectedToothSelect.schema';
import { SelectedToothIncludeObjectSchema as SelectedToothIncludeObjectSchema } from './objects/SelectedToothInclude.schema';
import { SelectedToothUpdateInputObjectSchema as SelectedToothUpdateInputObjectSchema } from './objects/SelectedToothUpdateInput.schema';
import { SelectedToothUncheckedUpdateInputObjectSchema as SelectedToothUncheckedUpdateInputObjectSchema } from './objects/SelectedToothUncheckedUpdateInput.schema';
import { SelectedToothWhereUniqueInputObjectSchema as SelectedToothWhereUniqueInputObjectSchema } from './objects/SelectedToothWhereUniqueInput.schema';

export const SelectedToothUpdateOneSchema: z.ZodType<Prisma.SelectedToothUpdateArgs> = z.object({ select: SelectedToothSelectObjectSchema.optional(), include: SelectedToothIncludeObjectSchema.optional(), data: z.union([SelectedToothUpdateInputObjectSchema, SelectedToothUncheckedUpdateInputObjectSchema]), where: SelectedToothWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.SelectedToothUpdateArgs>;

export const SelectedToothUpdateOneZodSchema = z.object({ select: SelectedToothSelectObjectSchema.optional(), include: SelectedToothIncludeObjectSchema.optional(), data: z.union([SelectedToothUpdateInputObjectSchema, SelectedToothUncheckedUpdateInputObjectSchema]), where: SelectedToothWhereUniqueInputObjectSchema }).strict();