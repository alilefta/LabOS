import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSelectObjectSchema as LabSelectObjectSchema } from './objects/LabSelect.schema';
import { LabUpdateManyMutationInputObjectSchema as LabUpdateManyMutationInputObjectSchema } from './objects/LabUpdateManyMutationInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './objects/LabWhereInput.schema';

export const LabUpdateManyAndReturnSchema: z.ZodType<Prisma.LabUpdateManyAndReturnArgs> = z.object({ select: LabSelectObjectSchema.optional(), data: LabUpdateManyMutationInputObjectSchema, where: LabWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabUpdateManyAndReturnArgs>;

export const LabUpdateManyAndReturnZodSchema = z.object({ select: LabSelectObjectSchema.optional(), data: LabUpdateManyMutationInputObjectSchema, where: LabWhereInputObjectSchema.optional() }).strict();