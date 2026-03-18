import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SelectedToothSelectObjectSchema as SelectedToothSelectObjectSchema } from './objects/SelectedToothSelect.schema';
import { SelectedToothIncludeObjectSchema as SelectedToothIncludeObjectSchema } from './objects/SelectedToothInclude.schema';
import { SelectedToothWhereUniqueInputObjectSchema as SelectedToothWhereUniqueInputObjectSchema } from './objects/SelectedToothWhereUniqueInput.schema';

export const SelectedToothFindUniqueSchema: z.ZodType<Prisma.SelectedToothFindUniqueArgs> = z.object({ select: SelectedToothSelectObjectSchema.optional(), include: SelectedToothIncludeObjectSchema.optional(), where: SelectedToothWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.SelectedToothFindUniqueArgs>;

export const SelectedToothFindUniqueZodSchema = z.object({ select: SelectedToothSelectObjectSchema.optional(), include: SelectedToothIncludeObjectSchema.optional(), where: SelectedToothWhereUniqueInputObjectSchema }).strict();