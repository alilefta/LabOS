import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { PatientSelectObjectSchema as PatientSelectObjectSchema } from './objects/PatientSelect.schema';
import { PatientIncludeObjectSchema as PatientIncludeObjectSchema } from './objects/PatientInclude.schema';
import { PatientWhereUniqueInputObjectSchema as PatientWhereUniqueInputObjectSchema } from './objects/PatientWhereUniqueInput.schema';

export const PatientFindUniqueSchema: z.ZodType<Prisma.PatientFindUniqueArgs> = z.object({ select: PatientSelectObjectSchema.optional(), include: PatientIncludeObjectSchema.optional(), where: PatientWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PatientFindUniqueArgs>;

export const PatientFindUniqueZodSchema = z.object({ select: PatientSelectObjectSchema.optional(), include: PatientIncludeObjectSchema.optional(), where: PatientWhereUniqueInputObjectSchema }).strict();