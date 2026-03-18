import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { PatientSelectObjectSchema as PatientSelectObjectSchema } from './objects/PatientSelect.schema';
import { PatientIncludeObjectSchema as PatientIncludeObjectSchema } from './objects/PatientInclude.schema';
import { PatientWhereUniqueInputObjectSchema as PatientWhereUniqueInputObjectSchema } from './objects/PatientWhereUniqueInput.schema';

export const PatientFindUniqueOrThrowSchema: z.ZodType<Prisma.PatientFindUniqueOrThrowArgs> = z.object({ select: PatientSelectObjectSchema.optional(), include: PatientIncludeObjectSchema.optional(), where: PatientWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PatientFindUniqueOrThrowArgs>;

export const PatientFindUniqueOrThrowZodSchema = z.object({ select: PatientSelectObjectSchema.optional(), include: PatientIncludeObjectSchema.optional(), where: PatientWhereUniqueInputObjectSchema }).strict();