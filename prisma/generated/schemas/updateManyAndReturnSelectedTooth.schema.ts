import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SelectedToothSelectObjectSchema as SelectedToothSelectObjectSchema } from './objects/SelectedToothSelect.schema';
import { SelectedToothUpdateManyMutationInputObjectSchema as SelectedToothUpdateManyMutationInputObjectSchema } from './objects/SelectedToothUpdateManyMutationInput.schema';
import { SelectedToothWhereInputObjectSchema as SelectedToothWhereInputObjectSchema } from './objects/SelectedToothWhereInput.schema';

export const SelectedToothUpdateManyAndReturnSchema: z.ZodType<Prisma.SelectedToothUpdateManyAndReturnArgs> = z.object({ select: SelectedToothSelectObjectSchema.optional(), data: SelectedToothUpdateManyMutationInputObjectSchema, where: SelectedToothWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.SelectedToothUpdateManyAndReturnArgs>;

export const SelectedToothUpdateManyAndReturnZodSchema = z.object({ select: SelectedToothSelectObjectSchema.optional(), data: SelectedToothUpdateManyMutationInputObjectSchema, where: SelectedToothWhereInputObjectSchema.optional() }).strict();