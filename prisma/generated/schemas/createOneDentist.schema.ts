import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { DentistSelectObjectSchema as DentistSelectObjectSchema } from './objects/DentistSelect.schema';
import { DentistIncludeObjectSchema as DentistIncludeObjectSchema } from './objects/DentistInclude.schema';
import { DentistCreateInputObjectSchema as DentistCreateInputObjectSchema } from './objects/DentistCreateInput.schema';
import { DentistUncheckedCreateInputObjectSchema as DentistUncheckedCreateInputObjectSchema } from './objects/DentistUncheckedCreateInput.schema';

export const DentistCreateOneSchema: z.ZodType<Prisma.DentistCreateArgs> = z.object({ select: DentistSelectObjectSchema.optional(), include: DentistIncludeObjectSchema.optional(), data: z.union([DentistCreateInputObjectSchema, DentistUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.DentistCreateArgs>;

export const DentistCreateOneZodSchema = z.object({ select: DentistSelectObjectSchema.optional(), include: DentistIncludeObjectSchema.optional(), data: z.union([DentistCreateInputObjectSchema, DentistUncheckedCreateInputObjectSchema]) }).strict();