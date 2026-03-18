import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ClinicSelectObjectSchema as ClinicSelectObjectSchema } from './objects/ClinicSelect.schema';
import { ClinicIncludeObjectSchema as ClinicIncludeObjectSchema } from './objects/ClinicInclude.schema';
import { ClinicUpdateInputObjectSchema as ClinicUpdateInputObjectSchema } from './objects/ClinicUpdateInput.schema';
import { ClinicUncheckedUpdateInputObjectSchema as ClinicUncheckedUpdateInputObjectSchema } from './objects/ClinicUncheckedUpdateInput.schema';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './objects/ClinicWhereUniqueInput.schema';

export const ClinicUpdateOneSchema: z.ZodType<Prisma.ClinicUpdateArgs> = z.object({ select: ClinicSelectObjectSchema.optional(), include: ClinicIncludeObjectSchema.optional(), data: z.union([ClinicUpdateInputObjectSchema, ClinicUncheckedUpdateInputObjectSchema]), where: ClinicWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ClinicUpdateArgs>;

export const ClinicUpdateOneZodSchema = z.object({ select: ClinicSelectObjectSchema.optional(), include: ClinicIncludeObjectSchema.optional(), data: z.union([ClinicUpdateInputObjectSchema, ClinicUncheckedUpdateInputObjectSchema]), where: ClinicWhereUniqueInputObjectSchema }).strict();