import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabUpdateManyMutationInputObjectSchema as LabUpdateManyMutationInputObjectSchema } from './objects/LabUpdateManyMutationInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './objects/LabWhereInput.schema';

export const LabUpdateManySchema: z.ZodType<Prisma.LabUpdateManyArgs> = z.object({ data: LabUpdateManyMutationInputObjectSchema, where: LabWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabUpdateManyArgs>;

export const LabUpdateManyZodSchema = z.object({ data: LabUpdateManyMutationInputObjectSchema, where: LabWhereInputObjectSchema.optional() }).strict();