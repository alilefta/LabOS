import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ClinicUpdateManyMutationInputObjectSchema as ClinicUpdateManyMutationInputObjectSchema } from './objects/ClinicUpdateManyMutationInput.schema';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './objects/ClinicWhereInput.schema';

export const ClinicUpdateManySchema: z.ZodType<Prisma.ClinicUpdateManyArgs> = z.object({ data: ClinicUpdateManyMutationInputObjectSchema, where: ClinicWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ClinicUpdateManyArgs>;

export const ClinicUpdateManyZodSchema = z.object({ data: ClinicUpdateManyMutationInputObjectSchema, where: ClinicWhereInputObjectSchema.optional() }).strict();