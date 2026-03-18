import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { PatientSelectObjectSchema as PatientSelectObjectSchema } from './objects/PatientSelect.schema';
import { PatientIncludeObjectSchema as PatientIncludeObjectSchema } from './objects/PatientInclude.schema';
import { PatientUpdateInputObjectSchema as PatientUpdateInputObjectSchema } from './objects/PatientUpdateInput.schema';
import { PatientUncheckedUpdateInputObjectSchema as PatientUncheckedUpdateInputObjectSchema } from './objects/PatientUncheckedUpdateInput.schema';
import { PatientWhereUniqueInputObjectSchema as PatientWhereUniqueInputObjectSchema } from './objects/PatientWhereUniqueInput.schema';

export const PatientUpdateOneSchema: z.ZodType<Prisma.PatientUpdateArgs> = z.object({ select: PatientSelectObjectSchema.optional(), include: PatientIncludeObjectSchema.optional(), data: z.union([PatientUpdateInputObjectSchema, PatientUncheckedUpdateInputObjectSchema]), where: PatientWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PatientUpdateArgs>;

export const PatientUpdateOneZodSchema = z.object({ select: PatientSelectObjectSchema.optional(), include: PatientIncludeObjectSchema.optional(), data: z.union([PatientUpdateInputObjectSchema, PatientUncheckedUpdateInputObjectSchema]), where: PatientWhereUniqueInputObjectSchema }).strict();