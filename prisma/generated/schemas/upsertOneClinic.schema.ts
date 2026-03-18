import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ClinicSelectObjectSchema as ClinicSelectObjectSchema } from './objects/ClinicSelect.schema';
import { ClinicIncludeObjectSchema as ClinicIncludeObjectSchema } from './objects/ClinicInclude.schema';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './objects/ClinicWhereUniqueInput.schema';
import { ClinicCreateInputObjectSchema as ClinicCreateInputObjectSchema } from './objects/ClinicCreateInput.schema';
import { ClinicUncheckedCreateInputObjectSchema as ClinicUncheckedCreateInputObjectSchema } from './objects/ClinicUncheckedCreateInput.schema';
import { ClinicUpdateInputObjectSchema as ClinicUpdateInputObjectSchema } from './objects/ClinicUpdateInput.schema';
import { ClinicUncheckedUpdateInputObjectSchema as ClinicUncheckedUpdateInputObjectSchema } from './objects/ClinicUncheckedUpdateInput.schema';

export const ClinicUpsertOneSchema: z.ZodType<Prisma.ClinicUpsertArgs> = z.object({ select: ClinicSelectObjectSchema.optional(), include: ClinicIncludeObjectSchema.optional(), where: ClinicWhereUniqueInputObjectSchema, create: z.union([ ClinicCreateInputObjectSchema, ClinicUncheckedCreateInputObjectSchema ]), update: z.union([ ClinicUpdateInputObjectSchema, ClinicUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ClinicUpsertArgs>;

export const ClinicUpsertOneZodSchema = z.object({ select: ClinicSelectObjectSchema.optional(), include: ClinicIncludeObjectSchema.optional(), where: ClinicWhereUniqueInputObjectSchema, create: z.union([ ClinicCreateInputObjectSchema, ClinicUncheckedCreateInputObjectSchema ]), update: z.union([ ClinicUpdateInputObjectSchema, ClinicUncheckedUpdateInputObjectSchema ]) }).strict();