import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { PatientSelectObjectSchema as PatientSelectObjectSchema } from './objects/PatientSelect.schema';
import { PatientIncludeObjectSchema as PatientIncludeObjectSchema } from './objects/PatientInclude.schema';
import { PatientCreateInputObjectSchema as PatientCreateInputObjectSchema } from './objects/PatientCreateInput.schema';
import { PatientUncheckedCreateInputObjectSchema as PatientUncheckedCreateInputObjectSchema } from './objects/PatientUncheckedCreateInput.schema';

export const PatientCreateOneSchema: z.ZodType<Prisma.PatientCreateArgs> = z.object({ select: PatientSelectObjectSchema.optional(), include: PatientIncludeObjectSchema.optional(), data: z.union([PatientCreateInputObjectSchema, PatientUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.PatientCreateArgs>;

export const PatientCreateOneZodSchema = z.object({ select: PatientSelectObjectSchema.optional(), include: PatientIncludeObjectSchema.optional(), data: z.union([PatientCreateInputObjectSchema, PatientUncheckedCreateInputObjectSchema]) }).strict();