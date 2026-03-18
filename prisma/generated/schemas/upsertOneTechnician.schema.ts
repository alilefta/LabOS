import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { TechnicianSelectObjectSchema as TechnicianSelectObjectSchema } from './objects/TechnicianSelect.schema';
import { TechnicianIncludeObjectSchema as TechnicianIncludeObjectSchema } from './objects/TechnicianInclude.schema';
import { TechnicianWhereUniqueInputObjectSchema as TechnicianWhereUniqueInputObjectSchema } from './objects/TechnicianWhereUniqueInput.schema';
import { TechnicianCreateInputObjectSchema as TechnicianCreateInputObjectSchema } from './objects/TechnicianCreateInput.schema';
import { TechnicianUncheckedCreateInputObjectSchema as TechnicianUncheckedCreateInputObjectSchema } from './objects/TechnicianUncheckedCreateInput.schema';
import { TechnicianUpdateInputObjectSchema as TechnicianUpdateInputObjectSchema } from './objects/TechnicianUpdateInput.schema';
import { TechnicianUncheckedUpdateInputObjectSchema as TechnicianUncheckedUpdateInputObjectSchema } from './objects/TechnicianUncheckedUpdateInput.schema';

export const TechnicianUpsertOneSchema: z.ZodType<Prisma.TechnicianUpsertArgs> = z.object({ select: TechnicianSelectObjectSchema.optional(), include: TechnicianIncludeObjectSchema.optional(), where: TechnicianWhereUniqueInputObjectSchema, create: z.union([ TechnicianCreateInputObjectSchema, TechnicianUncheckedCreateInputObjectSchema ]), update: z.union([ TechnicianUpdateInputObjectSchema, TechnicianUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.TechnicianUpsertArgs>;

export const TechnicianUpsertOneZodSchema = z.object({ select: TechnicianSelectObjectSchema.optional(), include: TechnicianIncludeObjectSchema.optional(), where: TechnicianWhereUniqueInputObjectSchema, create: z.union([ TechnicianCreateInputObjectSchema, TechnicianUncheckedCreateInputObjectSchema ]), update: z.union([ TechnicianUpdateInputObjectSchema, TechnicianUncheckedUpdateInputObjectSchema ]) }).strict();