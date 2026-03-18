import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SelectedToothWhereInputObjectSchema as SelectedToothWhereInputObjectSchema } from './objects/SelectedToothWhereInput.schema';

export const SelectedToothDeleteManySchema: z.ZodType<Prisma.SelectedToothDeleteManyArgs> = z.object({ where: SelectedToothWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.SelectedToothDeleteManyArgs>;

export const SelectedToothDeleteManyZodSchema = z.object({ where: SelectedToothWhereInputObjectSchema.optional() }).strict();