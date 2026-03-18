import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { TechnicianSelectObjectSchema as TechnicianSelectObjectSchema } from './objects/TechnicianSelect.schema';
import { TechnicianIncludeObjectSchema as TechnicianIncludeObjectSchema } from './objects/TechnicianInclude.schema';
import { TechnicianUpdateInputObjectSchema as TechnicianUpdateInputObjectSchema } from './objects/TechnicianUpdateInput.schema';
import { TechnicianUncheckedUpdateInputObjectSchema as TechnicianUncheckedUpdateInputObjectSchema } from './objects/TechnicianUncheckedUpdateInput.schema';
import { TechnicianWhereUniqueInputObjectSchema as TechnicianWhereUniqueInputObjectSchema } from './objects/TechnicianWhereUniqueInput.schema';

export const TechnicianUpdateOneSchema: z.ZodType<Prisma.TechnicianUpdateArgs> = z.object({ select: TechnicianSelectObjectSchema.optional(), include: TechnicianIncludeObjectSchema.optional(), data: z.union([TechnicianUpdateInputObjectSchema, TechnicianUncheckedUpdateInputObjectSchema]), where: TechnicianWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.TechnicianUpdateArgs>;

export const TechnicianUpdateOneZodSchema = z.object({ select: TechnicianSelectObjectSchema.optional(), include: TechnicianIncludeObjectSchema.optional(), data: z.union([TechnicianUpdateInputObjectSchema, TechnicianUncheckedUpdateInputObjectSchema]), where: TechnicianWhereUniqueInputObjectSchema }).strict();