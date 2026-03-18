import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { PatientSelectObjectSchema as PatientSelectObjectSchema } from './objects/PatientSelect.schema';
import { PatientIncludeObjectSchema as PatientIncludeObjectSchema } from './objects/PatientInclude.schema';
import { PatientWhereUniqueInputObjectSchema as PatientWhereUniqueInputObjectSchema } from './objects/PatientWhereUniqueInput.schema';
import { PatientCreateInputObjectSchema as PatientCreateInputObjectSchema } from './objects/PatientCreateInput.schema';
import { PatientUncheckedCreateInputObjectSchema as PatientUncheckedCreateInputObjectSchema } from './objects/PatientUncheckedCreateInput.schema';
import { PatientUpdateInputObjectSchema as PatientUpdateInputObjectSchema } from './objects/PatientUpdateInput.schema';
import { PatientUncheckedUpdateInputObjectSchema as PatientUncheckedUpdateInputObjectSchema } from './objects/PatientUncheckedUpdateInput.schema';

export const PatientUpsertOneSchema: z.ZodType<Prisma.PatientUpsertArgs> = z.object({ select: PatientSelectObjectSchema.optional(), include: PatientIncludeObjectSchema.optional(), where: PatientWhereUniqueInputObjectSchema, create: z.union([ PatientCreateInputObjectSchema, PatientUncheckedCreateInputObjectSchema ]), update: z.union([ PatientUpdateInputObjectSchema, PatientUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.PatientUpsertArgs>;

export const PatientUpsertOneZodSchema = z.object({ select: PatientSelectObjectSchema.optional(), include: PatientIncludeObjectSchema.optional(), where: PatientWhereUniqueInputObjectSchema, create: z.union([ PatientCreateInputObjectSchema, PatientUncheckedCreateInputObjectSchema ]), update: z.union([ PatientUpdateInputObjectSchema, PatientUncheckedUpdateInputObjectSchema ]) }).strict();