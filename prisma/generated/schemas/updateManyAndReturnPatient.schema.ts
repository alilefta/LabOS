import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { PatientSelectObjectSchema as PatientSelectObjectSchema } from './objects/PatientSelect.schema';
import { PatientUpdateManyMutationInputObjectSchema as PatientUpdateManyMutationInputObjectSchema } from './objects/PatientUpdateManyMutationInput.schema';
import { PatientWhereInputObjectSchema as PatientWhereInputObjectSchema } from './objects/PatientWhereInput.schema';

export const PatientUpdateManyAndReturnSchema: z.ZodType<Prisma.PatientUpdateManyAndReturnArgs> = z.object({ select: PatientSelectObjectSchema.optional(), data: PatientUpdateManyMutationInputObjectSchema, where: PatientWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PatientUpdateManyAndReturnArgs>;

export const PatientUpdateManyAndReturnZodSchema = z.object({ select: PatientSelectObjectSchema.optional(), data: PatientUpdateManyMutationInputObjectSchema, where: PatientWhereInputObjectSchema.optional() }).strict();