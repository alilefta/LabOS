import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSelectObjectSchema as LabSelectObjectSchema } from './objects/LabSelect.schema';
import { LabIncludeObjectSchema as LabIncludeObjectSchema } from './objects/LabInclude.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './objects/LabWhereUniqueInput.schema';

export const LabDeleteOneSchema: z.ZodType<Prisma.LabDeleteArgs> = z.object({ select: LabSelectObjectSchema.optional(), include: LabIncludeObjectSchema.optional(), where: LabWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.LabDeleteArgs>;

export const LabDeleteOneZodSchema = z.object({ select: LabSelectObjectSchema.optional(), include: LabIncludeObjectSchema.optional(), where: LabWhereUniqueInputObjectSchema }).strict();