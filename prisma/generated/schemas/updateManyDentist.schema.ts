import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { DentistUpdateManyMutationInputObjectSchema as DentistUpdateManyMutationInputObjectSchema } from './objects/DentistUpdateManyMutationInput.schema';
import { DentistWhereInputObjectSchema as DentistWhereInputObjectSchema } from './objects/DentistWhereInput.schema';

export const DentistUpdateManySchema: z.ZodType<Prisma.DentistUpdateManyArgs> = z.object({ data: DentistUpdateManyMutationInputObjectSchema, where: DentistWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.DentistUpdateManyArgs>;

export const DentistUpdateManyZodSchema = z.object({ data: DentistUpdateManyMutationInputObjectSchema, where: DentistWhereInputObjectSchema.optional() }).strict();