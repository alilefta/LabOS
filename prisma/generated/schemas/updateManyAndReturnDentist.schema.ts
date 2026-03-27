import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { DentistSelectObjectSchema as DentistSelectObjectSchema } from './objects/DentistSelect.schema';
import { DentistUpdateManyMutationInputObjectSchema as DentistUpdateManyMutationInputObjectSchema } from './objects/DentistUpdateManyMutationInput.schema';
import { DentistWhereInputObjectSchema as DentistWhereInputObjectSchema } from './objects/DentistWhereInput.schema';

export const DentistUpdateManyAndReturnSchema: z.ZodType<Prisma.DentistUpdateManyAndReturnArgs> = z.object({ select: DentistSelectObjectSchema.optional(), data: DentistUpdateManyMutationInputObjectSchema, where: DentistWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.DentistUpdateManyAndReturnArgs>;

export const DentistUpdateManyAndReturnZodSchema = z.object({ select: DentistSelectObjectSchema.optional(), data: DentistUpdateManyMutationInputObjectSchema, where: DentistWhereInputObjectSchema.optional() }).strict();