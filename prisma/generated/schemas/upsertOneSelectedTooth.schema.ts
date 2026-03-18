import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SelectedToothSelectObjectSchema as SelectedToothSelectObjectSchema } from './objects/SelectedToothSelect.schema';
import { SelectedToothIncludeObjectSchema as SelectedToothIncludeObjectSchema } from './objects/SelectedToothInclude.schema';
import { SelectedToothWhereUniqueInputObjectSchema as SelectedToothWhereUniqueInputObjectSchema } from './objects/SelectedToothWhereUniqueInput.schema';
import { SelectedToothCreateInputObjectSchema as SelectedToothCreateInputObjectSchema } from './objects/SelectedToothCreateInput.schema';
import { SelectedToothUncheckedCreateInputObjectSchema as SelectedToothUncheckedCreateInputObjectSchema } from './objects/SelectedToothUncheckedCreateInput.schema';
import { SelectedToothUpdateInputObjectSchema as SelectedToothUpdateInputObjectSchema } from './objects/SelectedToothUpdateInput.schema';
import { SelectedToothUncheckedUpdateInputObjectSchema as SelectedToothUncheckedUpdateInputObjectSchema } from './objects/SelectedToothUncheckedUpdateInput.schema';

export const SelectedToothUpsertOneSchema: z.ZodType<Prisma.SelectedToothUpsertArgs> = z.object({ select: SelectedToothSelectObjectSchema.optional(), include: SelectedToothIncludeObjectSchema.optional(), where: SelectedToothWhereUniqueInputObjectSchema, create: z.union([ SelectedToothCreateInputObjectSchema, SelectedToothUncheckedCreateInputObjectSchema ]), update: z.union([ SelectedToothUpdateInputObjectSchema, SelectedToothUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.SelectedToothUpsertArgs>;

export const SelectedToothUpsertOneZodSchema = z.object({ select: SelectedToothSelectObjectSchema.optional(), include: SelectedToothIncludeObjectSchema.optional(), where: SelectedToothWhereUniqueInputObjectSchema, create: z.union([ SelectedToothCreateInputObjectSchema, SelectedToothUncheckedCreateInputObjectSchema ]), update: z.union([ SelectedToothUpdateInputObjectSchema, SelectedToothUncheckedUpdateInputObjectSchema ]) }).strict();