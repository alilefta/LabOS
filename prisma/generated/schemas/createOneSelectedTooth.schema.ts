import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SelectedToothSelectObjectSchema as SelectedToothSelectObjectSchema } from './objects/SelectedToothSelect.schema';
import { SelectedToothIncludeObjectSchema as SelectedToothIncludeObjectSchema } from './objects/SelectedToothInclude.schema';
import { SelectedToothCreateInputObjectSchema as SelectedToothCreateInputObjectSchema } from './objects/SelectedToothCreateInput.schema';
import { SelectedToothUncheckedCreateInputObjectSchema as SelectedToothUncheckedCreateInputObjectSchema } from './objects/SelectedToothUncheckedCreateInput.schema';

export const SelectedToothCreateOneSchema: z.ZodType<Prisma.SelectedToothCreateArgs> = z.object({ select: SelectedToothSelectObjectSchema.optional(), include: SelectedToothIncludeObjectSchema.optional(), data: z.union([SelectedToothCreateInputObjectSchema, SelectedToothUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.SelectedToothCreateArgs>;

export const SelectedToothCreateOneZodSchema = z.object({ select: SelectedToothSelectObjectSchema.optional(), include: SelectedToothIncludeObjectSchema.optional(), data: z.union([SelectedToothCreateInputObjectSchema, SelectedToothUncheckedCreateInputObjectSchema]) }).strict();