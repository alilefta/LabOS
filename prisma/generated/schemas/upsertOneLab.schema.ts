import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSelectObjectSchema as LabSelectObjectSchema } from './objects/LabSelect.schema';
import { LabIncludeObjectSchema as LabIncludeObjectSchema } from './objects/LabInclude.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './objects/LabWhereUniqueInput.schema';
import { LabCreateInputObjectSchema as LabCreateInputObjectSchema } from './objects/LabCreateInput.schema';
import { LabUncheckedCreateInputObjectSchema as LabUncheckedCreateInputObjectSchema } from './objects/LabUncheckedCreateInput.schema';
import { LabUpdateInputObjectSchema as LabUpdateInputObjectSchema } from './objects/LabUpdateInput.schema';
import { LabUncheckedUpdateInputObjectSchema as LabUncheckedUpdateInputObjectSchema } from './objects/LabUncheckedUpdateInput.schema';

export const LabUpsertOneSchema: z.ZodType<Prisma.LabUpsertArgs> = z.object({ select: LabSelectObjectSchema.optional(), include: LabIncludeObjectSchema.optional(), where: LabWhereUniqueInputObjectSchema, create: z.union([ LabCreateInputObjectSchema, LabUncheckedCreateInputObjectSchema ]), update: z.union([ LabUpdateInputObjectSchema, LabUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.LabUpsertArgs>;

export const LabUpsertOneZodSchema = z.object({ select: LabSelectObjectSchema.optional(), include: LabIncludeObjectSchema.optional(), where: LabWhereUniqueInputObjectSchema, create: z.union([ LabCreateInputObjectSchema, LabUncheckedCreateInputObjectSchema ]), update: z.union([ LabUpdateInputObjectSchema, LabUncheckedUpdateInputObjectSchema ]) }).strict();