import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { DentistSelectObjectSchema as DentistSelectObjectSchema } from './objects/DentistSelect.schema';
import { DentistIncludeObjectSchema as DentistIncludeObjectSchema } from './objects/DentistInclude.schema';
import { DentistWhereUniqueInputObjectSchema as DentistWhereUniqueInputObjectSchema } from './objects/DentistWhereUniqueInput.schema';
import { DentistCreateInputObjectSchema as DentistCreateInputObjectSchema } from './objects/DentistCreateInput.schema';
import { DentistUncheckedCreateInputObjectSchema as DentistUncheckedCreateInputObjectSchema } from './objects/DentistUncheckedCreateInput.schema';
import { DentistUpdateInputObjectSchema as DentistUpdateInputObjectSchema } from './objects/DentistUpdateInput.schema';
import { DentistUncheckedUpdateInputObjectSchema as DentistUncheckedUpdateInputObjectSchema } from './objects/DentistUncheckedUpdateInput.schema';

export const DentistUpsertOneSchema: z.ZodType<Prisma.DentistUpsertArgs> = z.object({ select: DentistSelectObjectSchema.optional(), include: DentistIncludeObjectSchema.optional(), where: DentistWhereUniqueInputObjectSchema, create: z.union([ DentistCreateInputObjectSchema, DentistUncheckedCreateInputObjectSchema ]), update: z.union([ DentistUpdateInputObjectSchema, DentistUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.DentistUpsertArgs>;

export const DentistUpsertOneZodSchema = z.object({ select: DentistSelectObjectSchema.optional(), include: DentistIncludeObjectSchema.optional(), where: DentistWhereUniqueInputObjectSchema, create: z.union([ DentistCreateInputObjectSchema, DentistUncheckedCreateInputObjectSchema ]), update: z.union([ DentistUpdateInputObjectSchema, DentistUncheckedUpdateInputObjectSchema ]) }).strict();