import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { PatientSelectObjectSchema as PatientSelectObjectSchema } from './objects/PatientSelect.schema';
import { PatientIncludeObjectSchema as PatientIncludeObjectSchema } from './objects/PatientInclude.schema';
import { PatientWhereUniqueInputObjectSchema as PatientWhereUniqueInputObjectSchema } from './objects/PatientWhereUniqueInput.schema';

export const PatientDeleteOneSchema: z.ZodType<Prisma.PatientDeleteArgs> = z.object({ select: PatientSelectObjectSchema.optional(), include: PatientIncludeObjectSchema.optional(), where: PatientWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PatientDeleteArgs>;

export const PatientDeleteOneZodSchema = z.object({ select: PatientSelectObjectSchema.optional(), include: PatientIncludeObjectSchema.optional(), where: PatientWhereUniqueInputObjectSchema }).strict();