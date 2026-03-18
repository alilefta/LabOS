import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSelectObjectSchema as LabSelectObjectSchema } from './objects/LabSelect.schema';
import { LabIncludeObjectSchema as LabIncludeObjectSchema } from './objects/LabInclude.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './objects/LabWhereUniqueInput.schema';

export const LabFindUniqueOrThrowSchema: z.ZodType<Prisma.LabFindUniqueOrThrowArgs> = z.object({ select: LabSelectObjectSchema.optional(), include: LabIncludeObjectSchema.optional(), where: LabWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.LabFindUniqueOrThrowArgs>;

export const LabFindUniqueOrThrowZodSchema = z.object({ select: LabSelectObjectSchema.optional(), include: LabIncludeObjectSchema.optional(), where: LabWhereUniqueInputObjectSchema }).strict();