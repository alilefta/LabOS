import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SelectedToothUpdateManyMutationInputObjectSchema as SelectedToothUpdateManyMutationInputObjectSchema } from './objects/SelectedToothUpdateManyMutationInput.schema';
import { SelectedToothWhereInputObjectSchema as SelectedToothWhereInputObjectSchema } from './objects/SelectedToothWhereInput.schema';

export const SelectedToothUpdateManySchema: z.ZodType<Prisma.SelectedToothUpdateManyArgs> = z.object({ data: SelectedToothUpdateManyMutationInputObjectSchema, where: SelectedToothWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.SelectedToothUpdateManyArgs>;

export const SelectedToothUpdateManyZodSchema = z.object({ data: SelectedToothUpdateManyMutationInputObjectSchema, where: SelectedToothWhereInputObjectSchema.optional() }).strict();