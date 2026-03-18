import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ClinicSelectObjectSchema as ClinicSelectObjectSchema } from './objects/ClinicSelect.schema';
import { ClinicUpdateManyMutationInputObjectSchema as ClinicUpdateManyMutationInputObjectSchema } from './objects/ClinicUpdateManyMutationInput.schema';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './objects/ClinicWhereInput.schema';

export const ClinicUpdateManyAndReturnSchema: z.ZodType<Prisma.ClinicUpdateManyAndReturnArgs> = z.object({ select: ClinicSelectObjectSchema.optional(), data: ClinicUpdateManyMutationInputObjectSchema, where: ClinicWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ClinicUpdateManyAndReturnArgs>;

export const ClinicUpdateManyAndReturnZodSchema = z.object({ select: ClinicSelectObjectSchema.optional(), data: ClinicUpdateManyMutationInputObjectSchema, where: ClinicWhereInputObjectSchema.optional() }).strict();