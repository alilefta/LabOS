import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSelectObjectSchema as LabSelectObjectSchema } from './objects/LabSelect.schema';
import { LabIncludeObjectSchema as LabIncludeObjectSchema } from './objects/LabInclude.schema';
import { LabCreateInputObjectSchema as LabCreateInputObjectSchema } from './objects/LabCreateInput.schema';
import { LabUncheckedCreateInputObjectSchema as LabUncheckedCreateInputObjectSchema } from './objects/LabUncheckedCreateInput.schema';

export const LabCreateOneSchema: z.ZodType<Prisma.LabCreateArgs> = z.object({ select: LabSelectObjectSchema.optional(), include: LabIncludeObjectSchema.optional(), data: z.union([LabCreateInputObjectSchema, LabUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.LabCreateArgs>;

export const LabCreateOneZodSchema = z.object({ select: LabSelectObjectSchema.optional(), include: LabIncludeObjectSchema.optional(), data: z.union([LabCreateInputObjectSchema, LabUncheckedCreateInputObjectSchema]) }).strict();