import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SelectedToothSelectObjectSchema as SelectedToothSelectObjectSchema } from './objects/SelectedToothSelect.schema';
import { SelectedToothIncludeObjectSchema as SelectedToothIncludeObjectSchema } from './objects/SelectedToothInclude.schema';
import { SelectedToothWhereUniqueInputObjectSchema as SelectedToothWhereUniqueInputObjectSchema } from './objects/SelectedToothWhereUniqueInput.schema';

export const SelectedToothFindUniqueOrThrowSchema: z.ZodType<Prisma.SelectedToothFindUniqueOrThrowArgs> = z.object({ select: SelectedToothSelectObjectSchema.optional(), include: SelectedToothIncludeObjectSchema.optional(), where: SelectedToothWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.SelectedToothFindUniqueOrThrowArgs>;

export const SelectedToothFindUniqueOrThrowZodSchema = z.object({ select: SelectedToothSelectObjectSchema.optional(), include: SelectedToothIncludeObjectSchema.optional(), where: SelectedToothWhereUniqueInputObjectSchema }).strict();